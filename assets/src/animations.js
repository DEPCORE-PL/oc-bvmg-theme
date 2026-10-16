import anime from 'animejs/lib/anime.es.js';
import { hoverEffect } from './hover.js';

export const fadeIn = element => {
    anime({
        targets: element,
        opacity:[0,1]
    });
};

export const textSlideIn = element => {
    anime.timeline({loop: false}).add({
        targets: element.querySelectorAll('.letter'),
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
      });
};

export function displaceAnimation(fromImage, toImage){
    let displaceImage = document.querySelector('.slides').dataset.displaceImage;
    let slides = document.querySelectorAll('.slide');

    let displace = new hoverEffect({
        parent: document.querySelector('.background'),
        intensity: 0.3,
        image1: fromImage,
        image2: toImage,
        displacementImage: displaceImage,
        // hover: false,
    }).next();

};


export const sliderRemove = slide => {
    anime.timeline({loop:false}).add({
        targets: slide.querySelectorAll('.letter'),
        translateX: [0,40],
        translateZ: 0,
        opacity: [1,0],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
    });
};

export const sliderAdd = slide => {
    anime.timeline({loop:false}).add({
        targets: slide.querySelectorAll('.letter'),
        translateX: [4,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
    });
};

export function initAnimations(){

    function getClipPathRect(element) {
         return element.getBoundingClientRect().width + 10;
    }

    let menuItems = document.querySelectorAll('li.top-level span a,li.top-level span strong');
        anime.timeline({loop:false})
        .add({
            targets: menuItems,
            translateY: [100,0],
            opacity: [0,1],
            easing: "easeInQuart",
            duration: 500,
            delay: (el, i) => 54 * (i+1)
        })
        .add({
            targets: document.querySelector('.hero .blend'),
            translateX: [0,"60%"],
            opacity: [1,0.5],
            skewX: [0,-19],
            duration: 1000,
            easing: 'easeOutQuart',
            offset: "-=700",
    });

    let textWrapper = document.querySelectorAll('.text-splitter');

        textWrapper.forEach((wrapper) => {
            let element = wrapper.querySelector('.letters')
            element.innerHTML = element.textContent.replace(/([^\x00-\x00]|\w)/g, "<span class='letter'>$&</span>");
        } );

        let hero = document.querySelectorAll('.hero .text-splitter');
        hero.forEach((wrapper) => {
            let element = wrapper.querySelector('.letters')

            anime.timeline({loop: false})
            .add({
                targets: wrapper.querySelector('.line'),
                scaleY: [0,1],
                opacity: [0.5,1],
                easing: "easeOutExpo",
                duration: 1000
            })
            .add({
                targets: wrapper.querySelector('.line'),
                translateX: [0, getClipPathRect(element)],
                easing: "easeOutExpo",
                duration: 800,
                delay: 100
            }).add({
                targets: element.querySelectorAll('.letter'),
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 600,
                offset: '-=775',
                delay: (el, i) => 34 * (i+1)
            }).add({
                targets: wrapper.querySelector('.line'),
                scaleY: [1,0],
                easing: "easeOutExpo",
                duration: 300
            });
        });

        window.onscroll = function() {
            let hero = document.querySelector('.hero');
            if(! hero ) return;
            let main = document.querySelector('main');

            if(main.getBoundingClientRect().top < 0 ) hero.classList.add('intersected');
            else hero.classList.remove('intersected');
            if(window.pageYOffset-100 < 200)  hero.querySelector('.content').style.opacity = 1-(window.pageYOffset-100)/200;
        };

}