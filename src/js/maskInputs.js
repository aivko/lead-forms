import IMask from 'imask';

export const cvvMask = elementId => {
    const element = document.getElementById(elementId);
    IMask(element, {
        mask: '000',
    })
}

export const creditCardMask = elementId => {
    const element = document.getElementById(elementId);
    IMask(element,  {
        mask: '0000 0000 0000 0000',
    })
}

export const phoneNumberMask = elementId => {
    const element = document.getElementById(elementId);
    IMask(element,  {
        mask: '+{00}(000) 000 00 00'
    })
}