import express from "express";
import config from "config";
import cors from "cors";
import { connect } from "./src/db";
import { postsRouter } from "./src/api/routes/posts"
import { loggerError, loggerInfo } from "./src/utils/logger";
const app = express();
app.use(cors())
app.use(express.json());

const port = config.get("port")

const start = async () => {
    await connect();

    app.get(['/', '/sanity'], async (req, res) => {
        res.send("'CodingPlace;' server is online :)")
    });

    app.use('/api/posts', postsRouter)
}


start()
    .then(() => app.listen(port, () => loggerInfo(`App listening at port ${port}`)))
    .catch((err) => loggerError("Failed to run server", err));
