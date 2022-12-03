import express from "express";
import config from "config"
import { findPostsController } from "./src/api/postsController";
import { connect } from "./src/db";

const app = express();
const port = config.get("port")
const main = async() => {
    await connect()
}

app.get(['/', '/sanity'], async (req, res) => {
    res.send("'CodingPlace;' server is online :)")
});

app.get('/find', findPostsController);

main()
.then(() => app.listen(port, () => console.log(`App listening at port ${port}`)))
.catch(() => console.log("Failed to run server"));
