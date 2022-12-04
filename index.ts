import express from "express";
import config from "config"
import { findPostsController, insertPostsController, deletePostsController, updatePostsController } from "./src/api/postsController";
import { connect } from "./src/db";
import { findPostSchema } from "./src/api/postsSchema"
import { validate } from "./src/api/validator";

const app = express();
const port = config.get("port")
const main = async() => {
    await connect()
}

app.get(['/', '/sanity'], async (req, res) => {
    res.send("'CodingPlace;' server is online :)")
});

app.get('/findpost/:type', validate(findPostSchema), findPostsController);
app.get('/findpost/:type/:id', validate(findPostSchema), findPostsController);
app.post('/insertpost', insertPostsController);
app.delete('/removepost', deletePostsController);
app.put('/updatepost', updatePostsController);

main()
.then(() => app.listen(port, () => console.log(`App listening at port ${port}`)))
.catch(() => console.log("Failed to run server"));
