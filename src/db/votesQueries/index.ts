import * as mongo from "mongodb";
import config from "config";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from "./.."

const dbName: string = config.get("mongo.dbName");

export const updatePostVote = async (
    collectionName: string,
    id: string,
    action: string,
    user: string
) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        let updateData: any;
        if (action === "up") {
            updateData = {
                $addToSet: { upVote: user },
                $pull: { downVote: user }
            };
        } else {
            updateData = {
                $addToSet: { downVote: user },
                $pull: { upVote: user }
            };
        }
        const results = await collection.updateOne(
            { _id: new mongo.ObjectId(id) },
            updateData
        );
        loggerInfo(
            `Success to update ${JSON.stringify(
                results
            )} on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to update something on ${collectionName} in mongoDB. ${error}`
        );
    }
};