import { tns } from "tiny-slider/src/tiny-slider";

export function initSliders(){
    let heroSlider = document.querySelector('.hero .text-slider');
    let testimonialsSlider = document.querySelector('.depcore__testimonials-container');

    const globalControls = {
        nav: false,
        autoplay: true,
        autoplayButtonOutput: false,
        controls: false,
        navPosition: 'bottom',
    };

    if (heroSlider) {
        tns({
            container: heroSlider,
            ...globalControls
        })
    }

    if(testimonialsSlider){
        tns({
            container: testimonialsSlider,
            ...globalControls,
            nav: true,
            mode: 'gallery',
        })
    }

}