import { removeAll, isWebp } from "./utilities/functions.js"
import AirDatepicker from "air-datepicker";

/**
 * TODO: Требует доработки
 * Не нашел в api календаря события инициализации, чтобы после установки даты, вызывалась функция с рассчетом размера инпута
 * Вариант решения MutationObserver
 */
let startDate = new Date();
let endDate = new Date().setDate(startDate.getDate() + 1)
const calendarSearchInput = document.getElementById('date-search')

calendarSearchInput.addEventListener('keypress', e => e.preventDefault() )

const calendarSearch = new AirDatepicker(calendarSearchInput, {
    autoClose: true,
    range: true,
    multipleDatesSeparator: ' - ',
    dateFormat: 'dd/MM/yyyy',
    minDate: startDate,
    selectedDates: [startDate, endDate],

    onSelect: e => {
        console.log(e)
        setWidthInputSearchCalendar()
    },

    onRenderCell: e => {
        console.log('onRenderCell', e)
    },

    onShow: e => {
        console.log('onShow', e)
    },

    onHide: e => {
        console.log('onHide', e)
    },

    onChangeView: e => {
        console.log('onChangeView', e)
    },
})

// setWidthInputSearchCalendar()
function setWidthInputSearchCalendar() {
    const value = calendarSearchInput.value
    const domElem = document.createElement('div')

    domElem.innerText = value

    console.log(domElem, value)
    console.log(domElem.clientWidth)
}

// Эффект наведения на ссылки в меню
if (window.innerWidth > 768) {
    const menuLinkElems = document.querySelectorAll('.menu__link')
    let timeout
    
    for (let i = 0; i < menuLinkElems.length; i++) {
        const menuLink = menuLinkElems[i];
        
        menuLink.addEventListener('mouseenter', e => {
            const menuLinkActive = document.querySelector('.menu__link._active')
            
            clearTimeout(timeout)
            menuLinkActive.classList.add('_hide-hover')
        })
        
        menuLink.addEventListener('mouseleave', e => {
            const menuLinkActive = document.querySelector('.menu__link._active')
    
            if (!menuLink.classList.contains('_active')) {
                timeout = setTimeout(e => {
                    menuLinkActive.classList.remove('_hide-hover')
                }, 300)
            }
            else {
                menuLinkActive.classList.remove('_hide-hover')
            }
        })
    }
}

// Отступы у контента карточек в разделе Мероприятия, чтобы заголовок всегда полностью помещался
if (window.innerWidth > 670) {
    const cardElems = document.querySelectorAll('.se-card')
    
    for (let i = 0; i < cardElems.length; i++) {
        const card = cardElems[i];
        const content = card.querySelector('.se-card__content')
        const title = content.querySelector('.se-card__title')
    
        content.style.transform = `translateY(calc(100% - ${title.clientHeight - 5}px   ))`
    }
}

// Плейсхолдер текстовых полей
labelTextfield()
function labelTextfield() {
    const textfieldElems = document.querySelectorAll('.tf')

    for (let i = 0; i < textfieldElems.length; i++) {
        const textfield = textfieldElems[i];
        const input = textfield.querySelector('input, textarea')
        const label = textfield.querySelector('label')

        if (input.value != '') {
            label.classList.add('_change-label')
        }

        input.addEventListener('focus', e => {
            label.classList.add('_change-label')
        })
        
        input.addEventListener('blur', e => {
            if (input.value === '') {
                label.classList.remove('_change-label')
            }
        })
    }
}

// Списки выбора
select()
function select() {
    // Проверяем есть ли выбранные элементы при загрузке страницы. Если есть, то селект заполняется
    const selectedItemElems = document.querySelectorAll('.select-dropdown__item._selected')

    for (let i = 0; i < selectedItemElems.length; i++) {
        const selectedItem = selectedItemElems[i];
        const select = selectedItem.closest('.select')
        const sTitle = select.querySelector('.select-input__title')

        sTitle.innerText = selectedItem.innerHTML
        select.classList.add('_valid')
    }

    // Если пользователь кликнул по селекту, то он открывается/закрывается. Также он закроется если кликнуть вне его области
    window.addEventListener('click', e => {
        const target = e.target

        // Если пользователь кликнул вне зоны селекта
        if (!target.classList.contains('select') && !target.closest('.select._open')) {
            
            if (document.querySelector('.select._open')) {
                document.querySelector('.select._open').classList.remove('_open')
            }
        }

        // Если пользователь кликнул по шапке селекта
        if (target.classList.contains('select-input')) {
            target.parentElement.classList.toggle('_open')
        }

        // Если пользователь выбрал пункт из списка селекта
        if (target.classList.contains('select-dropdown__item')) {
            const select = target.closest('.select')
            const sTitle = select.querySelector('.select-input__title')
            const neighbourTargets = target.parentElement.querySelectorAll('.select-dropdown__item')

            sTitle.innerText = target.innerText

            removeAll(neighbourTargets, '_selected')
            target.classList.add('_selected')

            select.classList.remove('_open')
            select.classList.add('_valid')
        }
    })
}

// window.addEventListener('click', e => {
//     const target = e.target

//     if (target.nodeName == 'INPUT') {
//         textfieldRemoveError(target.closest('.tf'))
//     }
// })

// const formSignIn = document.querySelector('#form-sign-in')
// const signInInputElems = formSignIn.querySelectorAll('.tf input[data-tf-required]')

// formSignIn.addEventListener('submit', async e => {
//     let validForm = true
//     e.preventDefault()
    
//     // Проверка на пустоту
//     signInInputElems.forEach(input => {
//         if (textfieldEmpty(input)) {
//             validForm = false
//         }
//     })
    
//     if (validForm === false) {
//         console.log('Форма не до конца заполнена!')
//         return
//     }

//     const formData = new FormData(formSignIn)
//     const formAction = formSignIn.getAttribute('action')

//     const response = await fetch(formAction, {
//         method: 'POST',
//         body: formData,
//     })

//     if (response.ok) {
//         resetForm(formSignIn)
//     }
//     else {

//         setTimeout(e => {

//             console.error("Ошибка HTTP: " + response.status)
//         }, 2000)
//     }
// })

// function resetForm(form) {
//     form.reset()

//     const tfElems = form.querySelectorAll('.tf')

//     for (let i = 0; i < tfElems.length; i++) {
//         const tf = tfElems[i]
//         const tfLabel = tf.querySelector('label')
        
//         tfLabel.classList.remove('_change-label')
//     }
// }

// // Если пустое поле...
// function textfieldEmpty(textfield) {
//     if (textfield.value.trim() == '') {
//         textfieldAddError(textfield.closest('.tf'), 'Поле не должно быть пустым')
//         return true
//     }
// }

// // Добавить ошибку
// function textfieldAddError(textfield, errorText) {
//     textfield.dataset.textfieldError = errorText
//     textfield.classList.add('_textfield-error')
// }

// // Удалить ошибку
// function textfieldRemoveError(textfield) {
//     textfield.removeAttribute('data-textfield-error')
//     textfield.classList.remove('_textfield-error')
// }