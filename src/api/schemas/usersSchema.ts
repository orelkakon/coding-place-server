import * as yup from 'yup';

export const findUserSchema = yup.object({
    params: yup.object({
        username: yup.string()
    })
});