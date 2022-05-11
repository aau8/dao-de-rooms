import Swiper, { Navigation, EffectFade, Thumbs, Autoplay, Pagination, FreeMode, Scrollbar } from 'swiper'
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

if (document.querySelector('.sap-slide')) {
    const sApartsGallery = new Swiper('.s-aparts__gallery', {
        modules: [EffectFade, Navigation],
    
        slidesPerView: 1,
        // loop: true,
        allowTouchMove: false,
    
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
    })
    
    const sApartsContentElem = document.querySelector('.sap__content')
    const slides = sApartsContentElem.querySelectorAll('.sap-slide')
    const sApartsContent = new Swiper(sApartsContentElem, {
        modules: [EffectFade, Navigation, Pagination, Thumbs],
    
        slidesPerView: 1,
        loop: true,
        allowTouchMove: false,
        autoHeight: true,
    
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
    
        pagination: {
            el: '.sap__list',
            type: 'bullets',
            clickable: true,
            renderBullet: (i, className) => {
                return `<button class="${className} sap__apart-title">${slides[i].dataset.apartTitle}</button>`
            }
        },
    
        thumbs: {
            swiper: sApartsGallery,
        },
    
        navigation: {
            prevEl: '.sap__arrows_pc .sap__arrow_prev',
            nextEl: '.sap__arrows_pc .sap__arrow_next',
        }
    })
    
    if (window.innerWidth < 768) {
        const sApartsTitlesMobile = new Swiper('.s-aparts__titles', {
            modules: [EffectFade, Navigation, Thumbs],
        
            slidesPerView: 'auto',
            centeredSlides: true,
            slideToClickedSlide: true,
        
            navigation: {
                prevEl: '.sap__arrows_mobile .sap__arrow_prev',
                nextEl: '.sap__arrows_mobile .sap__arrow_next',
            },
            
            thumbs: {
                swiper: sApartsContent
            }
        })
    }
}