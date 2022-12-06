import { insertNewComment } from "../../db/commentsQueries"
import { Comment } from "../utils/types"

export const insertCommentController = async (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const content = req.body.content
    const author = req.body.author

    try {
        const newComment: Comment = {
            content, author, date: new Date(), marked: false
        }
        const results = await insertNewComment(type, id, newComment)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}
