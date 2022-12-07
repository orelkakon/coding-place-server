import { insertNewComment, deleteComment, updateComment, markComment } from "../../db/commentsQueries"
import { Comment } from "../utils/types"
import { v4 as uuidv4 } from 'uuid';

export const insertCommentController = async (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const content = req.body.content
    const author = req.body.author

    try {
        const newComment: Comment = {
            commentId: uuidv4(), content, author, date: new Date(), marked: false
        }
        const results = await insertNewComment(type, id, newComment)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const deleteCommentController = async (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const commentId = req.body.commentId

    try {
        const results = await deleteComment(type, id, commentId)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const updateCommentController = async (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const commentId = req.body.commentId
    const newContent = req.body.content
    
    try {
        const results = await updateComment(type, id, commentId, newContent)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const markCommentController = async (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const commentId = req.body.commentId
    
    try {
        const results = await markComment(type, id, commentId)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}


