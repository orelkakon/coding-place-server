import config from "config";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from "./.."
import { User } from "../../api/utils/types";

const dbName: string = config.get("mongo.dbName");

export const signUp = async (data: User) => {
    const collectionName = "users" 
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const insertResult = await collection.insertOne(data);
        loggerInfo(`Success to insert new user to mongoDB`);
        return insertResult;
    } catch (error: any) {
        loggerError(
            `Failed to insert new user to mongoDB. ${error}`
        );
    }
};


export const signIn = async (data: User) => {
    const collectionName = "users" 
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const insertResult = await collection.insertOne(data);

        loggerInfo(`Success to insert new user to mongoDB`);
        return insertResult;
    } catch (error: any) {
        loggerError(
            `Failed to insert new user to mongoDB. ${error}`
        );
    }
};