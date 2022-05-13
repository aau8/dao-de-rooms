import Swiper, { Navigation, FreeMode, Scrollbar } from 'swiper'
import { removeAll } from './utilities/functions.js';
import Masonry from "masonry-layout";
import imagesLoaded from 'imagesloaded';

if (document.querySelector('.gallery')) {
    const galleryGrid = document.querySelector('.gallery__grid')
    const galleryShowMore = document.querySelector('.gallery__btn-more')
    const firstTab = document.querySelector('[data-gallery-tab]')
    const tabElems = document.querySelectorAll('[data-gallery-tab]')
    let galleryMasonry
    
    window.addEventListener('hashchange', checkHashGallery)
    
    // Слайдер
    const galleryTabs = new Swiper('.gallery__tabs', {
        modules: [Navigation, Scrollbar, FreeMode],
    
        slidesPerView: 'auto',
        freeMode: true,
    
        navigation: {
            prevEl: '.gallery__tabs-arrow-prev',
            nextEl: '.gallery__tabs-arrow-next',
        },
    
        scrollbar: {
            el: '.gallery__tabs-scrollbar',
            draggable: true,
        }
    })
    
    
    for (let i = 0; i < tabElems.length; i++) {
        const tab = tabElems[i];
        
        tab.addEventListener('click', e => {
            const data = tab.dataset.galleryTab
            removeAll('[data-gallery-tab]._active', '_active')
    
            tab.classList.add('_active')
            window.location.hash = data
        })
    }
    
    // Проверяем хеш
    checkHashGallery()
    function checkHashGallery() {
        const hash = window.location.hash
    
        if (hash === '') {
            activeFirstTab()
        }
        else {
            const tabWithCatEquallyHash = document.querySelector(`[data-gallery-tab="${hash.replace('#', '')}"]`)
    
            if (tabWithCatEquallyHash) {
                removeAll('[data-gallery-tab]._active', '_active')
                tabWithCatEquallyHash.classList.add('_active')
                addImagesWhenLoadingPage(tabWithCatEquallyHash.dataset.galleryTab)
            }
            else {
                activeFirstTab()
            }
        }
    }
    
    // Активируем первый таб
    function activeFirstTab() {    
        removeAll('[data-gallery-tab]._active', '_active')
        firstTab.classList.add('_active')
        addImagesWhenLoadingPage(firstTab.dataset.galleryTab)
    }
    
    // Добавление изображений при загрузке страницы
    async function addImagesWhenLoadingPage(cat) {
        galleryGrid.removeAttribute('style')
        // galleryGrid.classList.add('_load')
        clearGalleryGrid()
        showButtonMore()
        loadButtonMore()
        // hideButtonMore()
    
        await fetch('./resources/gallery.json')
            .then(res => res.json())
            .then(json => {
                const catImages = json.filter(item => item.cat === cat)
                const imagesNotShowed = catImages
                const loadImages = catImages.slice(0, 6).map(item => {
                    return `<div class="gallery__grid-item" data-gallery-id="${item.id}" data-gallery-cat="${item.cat}"><img src="${item.format.another}" alt="" data-zoom></div>`
                }).join('')
    
                if (loadImages != '') {
                    addImagesToGallery(loadImages, imagesNotShowed)
                }
                else {
                    galleryGrid.style.height = '100px'
                    galleryGrid.insertAdjacentHTML('beforeend', '<span class="gallery__grid-empty">В этой категории пока нет изображений...</span>')
                    hideButtonMore()
                    galleryGrid.classList.remove('_load')
                }
            })
    }
    
    galleryShowMore.addEventListener('click', e => {
        uploadButtonMore()
        addMoreImagesToGallery(window.location.hash.replace('#', ''))
    })
    
    async function addMoreImagesToGallery(cat) {
        showButtonMore()
        loadButtonMore()
    
        await fetch('./resources/gallery.json')
            .then(res => res.json())
            .then(json => {
                const showedImages = galleryGrid.querySelectorAll('.gallery__grid-item')
                const showedImagesIdArr = Array.from(showedImages).map(item => item.dataset.galleryId)            
                const catImages = json.filter(item => item.cat === cat)
                const imagesNotShowed = catImages.filter(item => {
                    let showed = false
                    for (let i = 0; i < showedImagesIdArr.length; i++) {
                        const id = showedImagesIdArr[i];
                        
                        if (item.id == id) {
                            showed = true
                        }
                    }
    
                    if (!showed) return item
                })
                
                // console.log(imagesNotShowed)
    
                const loadImages = imagesNotShowed.slice(0, 6).map(item => {
                    return `<div class="gallery__grid-item" data-gallery-id="${item.id}" data-gallery-cat="${item.cat}"><img src="${item.format.another}" alt="" data-zoom></div>`
                }).join('')
    
    
                if (loadImages != '') {
                    addImagesToGallery(loadImages, imagesNotShowed)
                }
            })
    
    }
    
    // Загрузка картинок
    function loadButtonMore() {
        galleryShowMore.classList.add('_load')
    }
    
    // Картинки были загружены
    function uploadButtonMore() {
        galleryShowMore.classList.remove('_load')
    }
    
    // Показать кнопку "Смотреть еще"
    function showButtonMore() {
        galleryShowMore.style.display = 'flex'
    }
    
    // Скрыть кнопку "Смотреть еще"
    function hideButtonMore() {
        galleryShowMore.style.display = 'none'
    }
    
    // Чистим сетку и добавляем колонку, которая будет определять размер других изображений
    clearGalleryGrid()
    function clearGalleryGrid() {
        galleryGrid.innerHTML = '<div class="gallery__grid-sizer"></div>'
    }
    
    function addImagesToGallery(loadImages, imagesNotShowed) {
        galleryGrid.insertAdjacentHTML('beforeend', loadImages)
    
        // Проверяем загрузку всех изображений
        imagesLoaded(galleryGrid, e => {
    
            // Раскладка masonry на странице Галерея
            galleryMasonry = new Masonry( galleryGrid, {
                itemSelector: '.gallery__grid-item',
                columnWidth: '.gallery__grid-sizer',
                percentPosition: true, 
            })
    
            const galleryItemElems = galleryGrid.querySelectorAll('.gallery__grid-item:not(._show)')
            const galleryItemLength = galleryItemElems.length
            let i = 0
    
            const itemShowInterval = setInterval(e => {
                if ( i >= galleryItemLength - 1) {
                    clearInterval(itemShowInterval)
                }
    
                galleryItemElems[i].classList.add('_show')
                i++
            }, 150)
    
            galleryGrid.classList.remove('_load')
    
            if (imagesNotShowed.length > 6) {
                uploadButtonMore()
            }
            else {
                hideButtonMore()
            }
        })
    }
}
