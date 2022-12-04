import * as yup from 'yup';

export const findPostSchema = yup.object({
    params: yup.object({
        id: yup.string(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    })
});

export const removePostSchema = yup.object({
    params: yup.object({
        id: yup.string().required(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    })
});