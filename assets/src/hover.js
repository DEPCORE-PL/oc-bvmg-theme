// import THREE from 'js/three.js';
let THREE = require('three');
import { gsap, Expo, TweenMax } from "gsap";

export function hoverEffect (opts) {
  var vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

  var fragment = `
varying vec2 vUv;

uniform float dispFactor;
uniform sampler2D disp;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float angle1;
uniform float angle2;
uniform float intensity1;
uniform float intensity2;

uniform float canvasWidth;
uniform float canvasHeight;
uniform float image1Width;
uniform float image1Height;
uniform float image2Width;
uniform float image2Height;


mat2 getRotM(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

// Proportion script from here: https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
vec2 addProportionToDistortedPosition(vec2 originalDistortedPos, float imgWidth, float imgHeight){
  /* Set proportion code */
  vec2 s = vec2(canvasWidth, canvasHeight); // Screen
  vec2 i = vec2(imgWidth, imgHeight); // Image
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  return originalDistortedPos * s / new + offset;
  /* End set proportion code */
}

void main() {
  vec4 disp = texture2D(disp, vUv);
  vec2 dispVec = vec2(disp.r, disp.g);
  vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;
  vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
  distortedPosition1 = addProportionToDistortedPosition(distortedPosition1, image1Width, image1Height);
  distortedPosition2 = addProportionToDistortedPosition(distortedPosition2, image2Width, image2Height);
  vec4 _texture1 = texture2D(texture1, distortedPosition1);
  vec4 _texture2 = texture2D(texture2, distortedPosition2);
  gl_FragColor = mix(_texture1, _texture2, dispFactor);
}
`;

  // please respect authorship and do not remove
  console.log('%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ', 'color: #bada55; font-size: 0.8rem');


  function firstDefined() {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] !== undefined) return arguments[i];
    }
  }

  var parent = opts.parent;
  var dispImage = opts.displacementImage;
  var image1 = opts.image1;
  var image2 = opts.image2;
  var intensity1 = firstDefined(opts.intensity1, opts.intensity, 1);
  var intensity2 = firstDefined(opts.intensity2, opts.intensity, 1);
  var commonAngle = firstDefined(opts.angle, Math.PI / 4); // 45 degrees by default, so grayscale images work correctly
  var angle1 = firstDefined(opts.angle1, commonAngle);
  var angle2 = firstDefined(opts.angle2, -commonAngle * 3);
  var speedIn = firstDefined(opts.speedIn, opts.speed, 1.6);
  var speedOut = firstDefined(opts.speedOut, opts.speed, 1.2);
  var userHover = firstDefined(opts.hover, true);
  var easing = firstDefined(opts.easing, Expo.easeOut);
  var video = firstDefined(opts.video, false);

  if (!parent) {
    console.warn('Parent missing');
    return;
  }

  if (!(image1 && image2 && dispImage)) {
    console.warn('One or more images are missing');
    return;
  }

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(
    parent.offsetWidth / -2,
    parent.offsetWidth / 2,
    parent.offsetHeight / 2,
    parent.offsetHeight / -2,
    1,
    1000
  );

  camera.position.z = 1;

  var renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 0.0);
  renderer.setSize(parent.offsetWidth, parent.offsetHeight);
  parent.appendChild(renderer.domElement);

  var render = function () {
    // This will be called by the TextureLoader as well as TweenMax.
    renderer.render(scene, camera);
  };

  var loader = new THREE.TextureLoader();
  loader.crossOrigin = '';

  var disp = loader.load(dispImage, render);
  disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

  if (video) {
    var animate = function() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };
    animate();

    var video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.src = image1;
    video.load();

    var video2 = document.createElement('video');
    video2.autoplay = true;
    video2.loop = true;
    video2.src = image2;
    video2.load();

    var texture1 = new THREE.VideoTexture(video);
    var texture2 = new THREE.VideoTexture(video2);
    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

    video2.addEventListener('loadeddata', function() {
      video2.play();

      texture2 = new THREE.VideoTexture(video2);
      texture2.magFilter = THREE.LinearFilter;
      texture2.minFilter = THREE.LinearFilter;

      mat.uniforms.texture2.value = texture2;

    }, false);

    video.addEventListener('loadeddata', function() {
      video.play();

      texture1 = new THREE.VideoTexture(video);

      texture1.magFilter = THREE.LinearFilter;
      texture1.minFilter = THREE.LinearFilter;

      mat.uniforms.texture1.value = texture1;
    }, false);
  } else {
    var texture1 = loader.load(image1, function(texture){onTextureLoaded(texture, 1);});
    var texture2 = loader.load(image2, function(texture){onTextureLoaded(texture, 2);});

    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;
  }

  var mat = new THREE.ShaderMaterial({
    uniforms: {
      intensity1: {
        type: 'f',
        value: intensity1
      },
      intensity2: {
        type: 'f',
        value: intensity2
      },
      dispFactor: {
        type: 'f',
        value: 0.0
      },
      angle1: {
        type: 'f',
        value: angle1
      },
      angle2: {
        type: 'f',
        value: angle2
      },
      texture1: {
        type: 't',
        value: texture1
      },
      texture2: {
        type: 't',
        value: texture2
      },
      disp: {
        type: 't',
        value: disp
      },
      canvasWidth: {
        type: 'f',
        value: parent.offsetWidth
      },
      canvasHeight: {
        type: 'f',
        value: parent.offsetHeight
      },
      image1Width: {
        type: 'f',
        value: 700
      },
      image1Height: {
        type: 'f',
        value: 700
      },
      image2Width: {
        type: 'f',
        value: 700
      },
      image2Height: {
        type: 'f',
        value: 700
      }
    },

    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    opacity: 1.0,
  });

  var geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight, 1);
  var object = new THREE.Mesh(geometry, mat);
  scene.add(object);

  function onTextureLoaded(texture, texturePos){
    var imgWidth = texture.image.width;
    var imgHeight = texture.image.height;
    if(texturePos == 1){
      mat.uniforms.image1Width.value = imgWidth;
      mat.uniforms.image1Height.value = imgHeight;
    }
    else{
      mat.uniforms.image2Width.value = imgWidth;
      mat.uniforms.image2Height.value = imgHeight;
    }
    render();
  }

  function transitionIn() {
    TweenMax.to(mat.uniforms.dispFactor, speedIn, {
      value: 1,
      ease: easing,
      onUpdate: render,
      onComplete: render,
    });
  }

  function transitionOut() {
    TweenMax.to(mat.uniforms.dispFactor, speedOut, {
      value: 0,
      ease: easing,
      onUpdate: render,
      onComplete: render,
    });
  }

  if (userHover) {
    parent.addEventListener('mouseenter', transitionIn);
    parent.addEventListener('touchstart', transitionIn);
    parent.addEventListener('mouseleave', transitionOut);
    parent.addEventListener('touchend', transitionOut);
  }


  window.addEventListener('resize', function (e) {
    mat.uniforms.canvasWidth.value = parent.offsetWidth;
    mat.uniforms.canvasHeight.value = parent.offsetHeight;
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    render();
  });

  this.next = transitionIn;
  this.previous = transitionOut;
  renderer.setSize(parent.offsetWidth, parent.offsetHeight);
};



