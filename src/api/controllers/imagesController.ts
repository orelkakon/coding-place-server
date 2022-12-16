import { addImageProfile } from "../../db/imagesQueries"

export const profileImageController = async (req, res) => {
    const username = req.params.username
    const image = req.params.image

    try {
        const results = await addImageProfile(username, image)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}