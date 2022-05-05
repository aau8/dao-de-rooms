import Swiper, { Navigation, EffectFade, Thumbs, Autoplay, Pagination, FreeMode } from 'swiper'
// import 'swiper/css'
// import 'swiper/css/effect-fade'

const sReviewsSlider = new Swiper('.s-reviews__slider', {
    modules: [EffectFade, Navigation],

    slidesPerView: 1,
    loop: true,
    // allowTouchMove: false,

    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    navigation: {
        prevEl: '.s-reviews__arrow-prev',
        nextEl: '.s-reviews__arrow-next',
    }
})