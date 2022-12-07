import * as yup from 'yup';

export const insertCommentsSchema = yup.object({
    params: yup.object({
        id: yup.string(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    }),
    body: yup.object({
        content: yup.string().required(),
        author: yup.string().required()
    })
});

export const deleteCommentsSchema = yup.object({
    params: yup.object({
        id: yup.string(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    }),
    body: yup.object({
        commentId: yup.string().required(),
    })
});

export const updateCommentsSchema = yup.object({
    params: yup.object({
        id: yup.string(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    }),
    body: yup.object({
        commentId: yup.string().required(),
    })
});