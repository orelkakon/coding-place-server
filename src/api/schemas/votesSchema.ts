import * as yup from 'yup';

export const votesPostsSchema = yup.object({
    params: yup.object({
        id: yup.string().required(),
        type: yup.mixed().oneOf(["jobPosts", "journalPosts", "questionPosts"])
    }),
    body: yup.object({
        action: yup.mixed().oneOf(["up", "down"]),
        user: yup.string().required()
    })
});