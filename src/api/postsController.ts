import { loggerError } from "../utils/logger"
import { findPosts, insertNewPost, removePosts, updatePosts } from "./../db"
import { Post } from "./types"

export const insertPostsController = async (req, res) => {
    const type = req.params.type    
    const title = req.body.title
    const content = req.body.content
    const author = req.body.author
    const tags = req.body.tags
    const images = req.body.images

    try {
        const newPost: Post = {
            title, content, author, tags, images, comments: [], date: new Date()
        }        
        const results = await insertNewPost(type, newPost)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
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
        res.sendStatus(500)
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
        res.sendStatus(500)
    }
}

export const updatePostsController = async (req, res) => {
    res.send()
}