import * as yup from 'yup';

export const commentsSchema = yup.object({
    params: yup.object({
        id: yup.string(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    }),
    body: yup.object({
        comment: yup.string().required(),
        author: yup.string().required()
    })
});