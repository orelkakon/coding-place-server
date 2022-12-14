import { findUsers } from "../../db/usersQueries"

export const findUsersController = async (req, res) => {
    const username = req.params.username

    try {
        let filter = {}
        if (username) {
            filter = { username }
        }
        const results = await findUsers(filter)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}