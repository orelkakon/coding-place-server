import config from "config";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from ".."

const dbName: string = config.get("mongo.dbName");

export const addImageProfile = async (username, image) => {
    const db = client.db(dbName);
    const collectionName = "users";
    const collection = db.collection(collectionName);

    try {
        const filter = { username }
        const update = { image }
        const results = await collection.updateOne(filter, update);
        loggerInfo(
            `Success to add profile image on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to add profile image on ${collectionName} in mongoDB. ${error}`
        );
        throw error;
    }
};
