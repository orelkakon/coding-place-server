import * as yup from 'yup';

export const findPostSchema = yup.object({
    params: yup.object({
        id: yup.string(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"]),
    }),
    body: yup.object({
        username: yup.string(),
        serachStr: yup.string()
    })
});

export const removePostSchema = yup.object({
    params: yup.object({
        id: yup.string().required(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    })
});

export const updatePostSchema = yup.object({
    params: yup.object({
        id: yup.string().required(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    }),
    body: yup.object({
        title: yup.string(),
        content: yup.string(),
        tags: yup.array().of(
            yup.string()
        ),
    })
});

export const insertNewPostSchema = yup.object({
    params: yup.object({
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    }),
    body: yup.object().shape({
        title: yup.string().required(),
        content: yup.string().required(),
        author: yup.string().required(),
        tags: yup.array().of(
            yup.string()
        ),
        images: yup.array().of(
            yup.string()
        )
    })
});

export const closePostSchema = yup.object({
    params: yup.object({
        id: yup.string().required(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    })
});