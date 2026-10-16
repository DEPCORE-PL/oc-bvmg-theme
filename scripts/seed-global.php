<?php
declare(strict_types=1);

$apply = in_array('--apply', $argv, true);
if (in_array('--help', $argv, true) || in_array('-h', $argv, true)) {
    echo "Usage: php themes/bvmg-theme/scripts/seed-global.php [--apply]\n";
    echo "Without --apply this checks what would be inserted. Existing nonempty fields are never overwritten.\n";
    exit(0);
}

$themeRoot = dirname(__DIR__);
$projectRoot = dirname(dirname($themeRoot));
$appFile = $projectRoot . '/bootstrap/app.php';
$seedFile = $themeRoot . '/seeds/data/globals.public.json';

if (!is_file($appFile)) {
    fwrite(STDERR, "OctoberCMS bootstrap/app.php not found. Place bvmg-theme inside PROJECT/themes/.\n");
    exit(1);
}
$values = json_decode((string) file_get_contents($seedFile), true);
if (!is_array($values) || json_last_error() !== JSON_ERROR_NONE) {
    fwrite(STDERR, "Cannot parse globals.public.json.\n");
    exit(1);
}

try {
    require_once $projectRoot . '/vendor/autoload.php';

    $app = require $appFile;
    $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

    $themeCode = basename($themeRoot);
    \Config::set('cms.active_theme', $themeCode);
    \Config::set('cms.edit_theme', $themeCode);
    \Cms\Classes\Theme::resetCache();
    $indexer = \Tailor\Classes\BlueprintIndexer::instance();
    if (method_exists($indexer, 'setThemeContext')) {
        $indexer->setThemeContext($themeCode);
    }
    \Tailor\Classes\BlueprintIndexer::clearCache();
    \Tailor\Classes\BlueprintIndexer::flushCache();
    $indexer->indexGlobals();

    $primarySite = \Site::getPrimarySite();
    if (!$primarySite) {
        throw new \RuntimeException('No primary site; configure Settings > Manage Sites first.');
    }
    echo "Content\\Global - primary site #{$primarySite->id} ({$primarySite->code})\n";
    \Site::withContext($primarySite->id, static function () use ($values, $apply) {
        $indexer = \Tailor\Classes\BlueprintIndexer::instance();
        $blueprint = $indexer->findGlobalByHandle('Content\\Global');
        if (!$blueprint) {
            $handles = array_map(static fn ($item) => $item->handle, $indexer->listGlobals());
            throw new \RuntimeException('Content\\Global not indexed. Visible globals: '.implode(', ', $handles));
        }
        $global = \Tailor\Models\GlobalRecord::inGlobalUuid($blueprint->uuid)->first();
        $missing = [];
        $preserved = [];
        foreach ($values as $field => $value) {
            $current = $global ? $global->getAttribute($field) : null;
            if ($current === null || $current === '') {
                $missing[$field] = $value;
            } else {
                $preserved[] = $field;
            }
        }
        echo "Missing fields: " . implode(', ', array_keys($missing)) . "\n";
        echo "Preserved existing fields: " . implode(', ', $preserved) . "\n";
        if (!$apply) {
            echo "DRY RUN: nothing written. Pass --apply to fill only missing fields.\n";
            return;
        }
        if (!$missing) {
            echo "No changes needed.\n";
            return;
        }
        if (!$global) {
            $global = \Tailor\Models\GlobalRecord::findForGlobalUuid($blueprint->uuid);
        }
        foreach ($missing as $field => $value) {
            $global->{$field} = $value;
        }
        $global->save();
        echo "Filled " . count($missing) . " field(s) without replacing existing values.\n";
    });
} catch (\Throwable $e) {
    fwrite(STDERR, "Initialization failed: " . $e->getMessage() . "\n");
    exit(1);
}
