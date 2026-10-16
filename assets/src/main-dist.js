(function() {
  var FadeTransition, animPartners, domReady, initFunctions, initHotspots, menuToggle, navigation, revealText, revealTextPrep, siteHeader, sticky, timeOut;

  sticky = {
    sticky_after: 200,
    init: function() {
      this.header = document.getElementsByTagName('header')[0];
      this.clone = this.header.cloneNode(true);
      this.clone.classList.add('clone');
      this.scroll();
      this.events();
    },
    scroll: function() {
      if (window.scrollY > this.sticky_after) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    },
    events: function() {
      window.addEventListener('scroll', this.scroll.bind(this));
    }
  };

  document.addEventListener('DOMContentLoaded', sticky.init.bind(sticky));

  timeOut = 30;

  revealTextPrep = function() {
    var elements;
    elements = document.querySelectorAll('.text-reveal');
    return Array.prototype.forEach.call(elements, function(el, i) {
      var rows;
      rows = el.innerHTML.trim().split('<br>');
      el.innerHTML = '';
      return rows.forEach(function(row, i) {
        var letters, temp;
        letters = row.trim().split('');
        temp = document.createElement('span');
        temp.classList.add('row');
        letters.forEach(function(letter, i) {
          var span;
          span = document.createElement('span');
          if (letter === ' ') {
            letter = '&nbsp;';
          }
          span.innerHTML = letter;
          return temp.appendChild(span);
        });
        el.appendChild(temp);
        return el.classList.add('strip');
      });
    });
  };

  revealText = function() {
    var i, spans, _results;
    spans = document.querySelectorAll('.strip span');
    i = 0;
    _results = [];
    while (i < spans.length) {
      (function(ind) {
        setTimeout((function() {
          if (!spans[ind].classList.contains('row')) {
            spans[ind].classList.toggle('animate');
          }
        }), ind * timeOut);
      })(i);
      _results.push(i++);
    }
    return _results;
  };

  revealTextPrep();

  navigation = document.getElementById('masthead');

  window.addEventListener('mousemove', function(e) {
    return navigation.classList.add('show');
  });

  domReady = function(callback) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };

  domReady(function() {
    var hero;
    hero = document.querySelectorAll('.hero');
    if (hero.length > 0) {
      hero[0].classList.add('anim');
    }
    setTimeout(revealText(), 3000);
    sticky.init.bind(sticky);
    initFunctions();
  });


  initFunctions = function() {
    var image, partnersBar, relaxSuper, rellaxdown, rellaxup, x;
    window.scrollTo(0, 0);
    document.getElementById('masthead').classList.remove('toggled');
    partnersBar = document.querySelector('.partners-bar');
    if (partnersBar) {
      x = 0;
      while (x < partnersBar.children.length) {
        partnersBar.children[x].classList.add('hide');
        x++;
      }
    }
    if (document.querySelectorAll('.rellaxed-up').length > 0) {
      rellaxup = new Rellax('.rellaxed-up', {
        speed: 1
      });
    }
    if (document.querySelectorAll('.rellaxed-down').length > 0) {
      rellaxdown = new Rellax('.rellaxed-down', {
        speed: -1
      });
    }
    if (document.querySelectorAll('h1.super-title').length > 0) {
      relaxSuper = new Rellax('h1.super-title', {
        speed: 3
      });
    }
    if (document.querySelectorAll('.paralax').length > 0) {
      image = new Rellax('.paralax img', {
        speed: 2
      });
    }

    // window.sr = ScrollReveal({
    //   duration: 2000
    // });
    // sr.reveal('section h2,section p.lead,section .button,section.testimonial,div.grid__half>*', {
    //   scale: 1
    // });
    // sr.reveal('.grid__services > div,.vacancy-list > li', {
    //   origin: 'bottom',
    //   distance: '100px',
    //   duration: 1000,
    //   delay: 300,
    //   scale: 1,
    //   interval: 100
    // });
    // sr.reveal('.partners-bar', {
    //   scale: 1,
    //   afterReveal: function() {
    //     return animPartners();
    //   }
    // });
    // return initHotspots();
  };

  menuToggle = document.querySelector('.menu-toggle');

  siteHeader = document.getElementById('masthead');

  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle("toggled");

    return siteHeader.classList.toggle('toggled');
  });

  document.getelemet;

}).call(this);


(initialize = function() {
  var contentString, icon, infowindow, latlon, map, mapOptions, marker, pos, positionFound, style;

  latlon = new google.maps.LatLng(50.731147, 17.907977);

  icon = new google.maps.MarkerImage('/themes/napolance/assets/images/map-marker.png');


  style = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "100"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "100"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "100"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": "23"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffd900"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ffd900"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#cccccc"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

  mapOptions = {
    zoom: 15,
    center: latlon,
    styles: style,
  };

  contentString = "<h4>Żłobek Na Polance</h4> Wolności 65<br>45-920 Opole &ndash; Czarnowąsy";

  infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  marker = new google.maps.Marker({
    position: latlon,
    map: map,
    title: "Na Polance",
    icon: icon
  });

  google.maps.event.addListener(marker, "click", function() {
    return infowindow.open(map, marker);
  });

  google.maps.event.addListener(map, 'click', function(event) {
    this.setOptions({
      scrollwheel: true
    });
  });

  google.maps.event.addListener(map, 'mouseout', function(event) {
    this.setOptions({
      scrollwheel: false
    });
  });

  return;

});

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
      google.maps.event.addDomListener(window, 'load', initialize);
    }
  });

}).call(this);

let tobiOptions = {
    nav: 'auto',
    navText: ['<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24"><polyline points="14 18 8 12 14 6 14 6"></polyline></svg>', '<svg width="100%" height="100%" viewBox="0 0 10 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M7.123,8.502c-2.297,-2.222 -4.504,-4.537 -6.764,-6.797c-0.561,-0.592 -0.154,-1.754 0.788,-1.703c0.218,0.023 0.42,0.11 0.587,0.252c2.595,2.458 5.057,5.054 7.584,7.582c0.167,0.177 0.229,0.398 0.214,0.621c0.016,0.24 -0.051,0.485 -0.222,0.687c-2.458,2.595 -5.054,5.057 -7.582,7.584c-0.703,0.666 -2.388,-0.273 -1.452,-1.375c2.221,-2.344 4.553,-4.578 6.847,-6.851Z" style="fill:#fff;fill-rule:nonzero;"/></svg>'],
    navLabel: ['Poprzednie', 'Następne'],
    close: true,
    closeText: '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24"><path d="M8.568,7.154l6.862,-6.862c0.207,-0.192 0.303,-0.3 0.765,-0.291c0.794,0.076 1.212,1.098 0.649,1.705l-6.861,6.862l6.861,6.862c0.727,0.784 -0.462,2.295 -1.414,1.414l-6.862,-6.862l-6.862,6.862c-0.792,0.733 -2.288,-0.471 -1.414,-1.414l6.862,-6.862l-6.862,-6.862c-0.583,-0.63 -0.282,-1.765 0.803,-1.703c0.233,0.032 0.441,0.131 0.611,0.289l6.862,6.862Z" style="fill:#fff;fill-rule:nonzero;"/></svg>',
    closeLabel: 'Zamknij',
    loadingIndicatorLabel: 'Wczytuję zdjęcie',
    counter: false,
    keyboard: true,
    zoom: false,
    zoomText: '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><polyline points="21 16 21 21 16 21"/><polyline points="8 21 3 21 3 16"/><polyline points="16 3 21 3 21 8"/><polyline points="3 8 3 3 8 3"/></svg>',
    docClose: true,
    swipeClose: true,
  };

var tobi = new Tobi(tobiOptions);

const swup = new Swup({
  elements: ['#page']
});

document.addEventListener('swup:contentReplaced', event => {
    // if (document.getElementById('map')) {
      google.maps.event.addDomListener(window, 'load', initialize);
    // }
    document.getElementById('masthead').classList.remove('toggled');

    var tobi = new Tobi(tobiOptions);

});


//# sourceMappingURL=main-dist.js.map