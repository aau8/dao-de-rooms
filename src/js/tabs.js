import { getSiblings } from './utilities/functions.js'

// Аккордеон
accFAQ()
function accFAQ() {
  const hiddenSiblingAcc = true // Скрывать соседние аккордеоны. false если не нужно.
  const accHeaderElems = document.querySelectorAll('[data-acc-toggle]')
  
  for (let i = 0; i < accHeaderElems.length; i++) {
    const accHeader = accHeaderElems[i]
    
    accHeader.addEventListener('click', e => {
      const container = (!accHeader.closest('[data-acc-body]')) ? accHeader.parentElement.parentElement : accHeader.closest('[data-acc-body]')
      const parent = accHeader.parentElement
      const accBody = accHeader.nextElementSibling

      parent.classList.toggle('_show') 
      
      if (accBody.style.maxHeight) { 
        accBody.style.maxHeight = null
        parent.classList.remove('_show') 
      }
      else {
        const adjacentElems = getSiblings(parent)
        
        if (hiddenSiblingAcc) {
          for (let i = 0; i < adjacentElems.length; i++) {
            const elem = adjacentElems[i]
            const elemHeader = elem.querySelector('[data-acc-toggle]')
            const elemBody = elem.querySelector('[data-acc-body]')

            elem.classList.remove('_show') 
            elemHeader.classList.remove('_show')  
            elemBody.style.maxHeight = null
          }
        }
        
        accBody.style.maxHeight = accBody.scrollHeight + 'px'
        container.style.maxHeight = parseInt(container.scrollHeight) + accBody.scrollHeight + 'px'
      }
    })
  }
}