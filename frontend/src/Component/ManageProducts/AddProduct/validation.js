import * as yup from 'yup';
export const productValidationSchema = yup.object({
    productName: yup
        .string()
        .required('Enter product name'),
    description: yup
        .string()
        .required('Enter product description'),
    quantity: yup
        .number()
        .required('Enter product quantity'),
    unitPrice: yup
        .number()
        .required('Status is required'),
    productImage: yup
        .string(),
});
