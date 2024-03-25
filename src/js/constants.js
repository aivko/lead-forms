import * as yup from "yup";

const phoneRegExp = /^\+[0-9]{2}\([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2}$/;
export const formSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').notRequired(),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone Number is required'),
    country: yup.string().required('Country is required'),
    address: yup.string().required('Address is required'),
    cc: yup.string().min(16).required('Credit Card is required'),
    cvv: yup.string().min(3).max(3).required('CVV is required'),
    checkbox: yup.boolean().required('Terms of use is required'),
});