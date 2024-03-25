import { formSchema } from "@/js/constants";
import * as yup from "yup";

export const setFocusOnField = (field) => {
    try {
        document.querySelector(`[name=${field}]`).focus();
        document.querySelector(`[name=${field}]`).scrollIntoView({
            behavior: "smooth", block: "end", inline: "nearest"
        })
    } catch (error) {
        throw new Error(error);
    }
}

export const handleSubmitButton = ({ id, status }) => {
    const submitButton = document.getElementById(id);
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    if (status === 'finish') {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
}

export const submitHandler = (time) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
}

export const setErrorOnField = (data) => {
    const { field, message } = data;
    try {
        const elem = document.querySelector(`p[data-field=${field}]`);
        elem.classList.add('is-visible');
        elem.innerHTML = message;
    } catch (error) {
        throw new Error(error);
    }
}

export const clearError = (field) => {
    try {
        const element = document.querySelector(`p[data-field=${field}]`);
        element.classList.remove('is-visible');
        element.innerHTML = '';
    } catch (error) {
        throw new Error(error);
    }
};
export const clearErrors = () => {
    try {
        const elements = document.querySelectorAll(`p[data-field]`);
        elements.forEach(element => {
            element.classList.remove('is-visible');
            element.innerHTML = '';
        })
    } catch (error) {
        throw new Error(error);
    }
};

export const checkFieldIsValid = async (field) => {
    const elem = document.getElementById(field);
    const value = elem.type === 'checkbox' ? elem.checked : elem.value;
    return await yup.reach(formSchema, field).validate(value)
}

export const initFormValidation = ({ schema, formId }) => {
    const form = document.querySelector(formId);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        handleSubmitButton({
            id: 'submit-button',
            status: 'start'
        })

        const formData = new FormData(form);


        // hack for checkboxes
        const checkboxStatus = document.getElementById('checkbox').checked
        if (checkboxStatus) {
            formData.append("checkbox", checkboxStatus);
        }

        const data = Object.fromEntries(formData.entries());

        try {
            console.log(data)
            await schema.validate(data, { abortEarly: false });
            await asyncEmailValidation('some@email.com');

        } catch (error) {
            const errorList = [];
            error.inner.forEach(err => {
                errorList.push({ field: err.path, message: err.message });
            });

            setFocusOnField(errorList[0].field);
            clearErrors();
            for (let i = 0; i < errorList.length; i++) {
                setErrorOnField(errorList[i])
            }
        } finally {
            handleSubmitButton({
                id: 'submit-button',
                status: 'finish'
            })
        }
    });
}

export const handleFormEventListeners = ({field, type}) => {
    const element = document.getElementById(field);
    element.addEventListener(type, () => {
        checkFieldIsValid(field)
            .then(() => clearError(field))
            .catch(error => error)
    });
}

export const asyncEmailValidation = (email) => {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        if (random < 0.75) {
            setTimeout(() => resolve(), 1000);
        } else {
            setTimeout(() => reject(new Error("Validation failed")), 1000);
        }
    });
}