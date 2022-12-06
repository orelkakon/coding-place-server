import { updatePostVote } from "./../../db/votesQueries"

export const votePostController = async (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const action = req.body.action
    const user = req.body.user

    try {
        
        const results = await updatePostVote(type, id, action, user)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}