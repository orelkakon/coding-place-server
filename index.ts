import express from "express";
import config from "config"
import { loggerInfo, loggerError } from "./src/utils/logger";

const app = express();
const port = config.get("port")

loggerError("Fddfdf")
app.get(['/', '/sanity'], async (req, res) => {
    res.send("'CodingPlace;' server is online :)")
});

app.listen(port, () => console.log(`App listening at port ${port}`));
