import { initSelect } from '@/js/initSelect';
import { initFormValidation, handleFormEventListeners } from '@/js/formHelpers';
import { formSchema } from '@/js/constants';
import {
    cvvMask,
    creditCardMask,
    phoneNumberMask,
} from "@/js/maskInputs";

import '@/styles/index.scss';


document.querySelector("#wrapper").scrollIntoView({
    behavior: 'smooth',
});

document.addEventListener("DOMContentLoaded", () => {
    initSelect({ id: 'country' });
    cvvMask('cvv');
    creditCardMask('cc');
    phoneNumberMask('phoneNumber');

    try {
        const fields = formSchema.fields
        for (let key in fields) {
            const type = (key !== 'checkbox' && key !== 'country') ? "keyup" : "change";
            handleFormEventListeners({
                field: key,
                type: type,
            });
        }
    } catch (error) {
        console.log(error)
    }
});

initFormValidation({
    schema: formSchema,
    formId: '.js-register-form'
});
