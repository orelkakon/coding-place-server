import * as yup from 'yup';

export const profileImageSchema = yup.object({
    params: yup.object({
        username: yup.string()
    }),
    body: yup.object({
        image: yup.string().required()
    }),
});