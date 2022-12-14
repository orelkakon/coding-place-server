import * as mongo from "mongodb";
import config from "config";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from ".."

const dbName: string = config.get("mongo.dbName");

export const findUsers = async (filter = {}) => {
    const db = client.db(dbName);
    const collectionName = "users";
    const collection = db.collection(collectionName);
    
    try {
        const results = await collection.find(filter).toArray();
        loggerInfo(
            `Success to find post on ${collectionName} in mongoDB`
        );
        return results.map(({ username, email, phone }) => { return { username, email, phone } });

    } catch (error: any) {
        loggerError(
            `Failed to find post on ${collectionName} in mongoDB. ${error}`
        );
        throw error;
    }
};
