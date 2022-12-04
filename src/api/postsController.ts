import { findPosts, insertNewPost, removePosts, updatePosts } from "./../db"

export const insertPostsController = async (req, res) => {
    res.send()
}

export const findPostsController = async (req, res) => {
    const postId =  req.params.id
    const postType = req.params.type
    
    try {
        const results = await findPosts(postType, postId)
        if(results.length > 0)
            res.send(results)
        else {
            res.send([])
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

export const deletePostsController = async (req, res) => {
    const postId =  req.params.id
    const postType = req.params.type
    
    try {
        const results = await removePosts(postType, postId)
        if(results)
            res.send(results)
        else {
            res.send([])
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

export const updatePostsController = async (req, res) => {
    res.send()
}