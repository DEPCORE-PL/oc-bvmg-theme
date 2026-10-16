console.log('%c This site has been created by DEPCORE | depcore.pl ', 'background: #ffe400; color: #121212; padding: 30px 20px');
import {initSliders} from "./init-sliders.js";
import { initMap} from "./contactmap";
import Headroom from "headroom.js";
import simpleParallax from 'simple-parallax-js';

const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = document.getElementById('masthead');
const hero = document.querySelector('.hero');

let headroom = new Headroom(document.querySelector("header.site-header"));
headroom.init();

const domReady = function(callback) {
    if ((document.readyState === 'interactive') || (document.readyState === 'complete')) { callback(); } else { document.addEventListener('DOMContentLoaded', callback); }
};

let delayTimer = 1000;

function initializeAll(){
    initSliders();
    initMap();
    var image = document.getElementsByClassName('parallax-image');
    new simpleParallax(image);
}

domReady(function() {
    hero.style.marginTop = siteHeader.offsetHeight + 'px';

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle("toggled");
        return siteHeader.classList.toggle('toggled');
    });


    document.querySelector('.core_loader').classList.remove('-show');

    setTimeout(function(){
       document.querySelector('.core_loader').classList.remove('-front');
       initializeAll();
    }, delayTimer);

});