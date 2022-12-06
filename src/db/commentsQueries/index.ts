import * as mongo from "mongodb";
import config from "config";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from "./.."
import { Comment } from "../../api/utils/types";

const dbName: string = config.get("mongo.dbName");

export const insertNewComment = async (collectionName: string, id: string, data: Comment) => {
    console.log(collectionName);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const updateData = {
            $addToSet: { comments: data.content },
        };
        const insertResult = await collection.updateOne(
            { _id: new mongo.ObjectId(id) },
            { updateData }
        );
        loggerInfo(`Success to insert ${data} to ${collectionName} in mongoDB`);
        return insertResult;
    } catch (error: any) {
        loggerError(
            `Failed to insert ${data} to ${collectionName} in mongoDB`,
            error
        );
    }
};

export const removeComment = async (collectionName: string, id: string) => { //need to update fot comment
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const results = await collection.deleteOne({ _id: new mongo.ObjectId(id) });
        loggerInfo(
            `Success to delete ${JSON.stringify(
                results
            )} on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to delete something on ${collectionName} in mongoDB`,
            error
        );
    }
};

export const updateComment = async ( //need to update fot comment
    collectionName: string,
    id: string,
    update = {}
) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const updateData = {
            $set: { update },
        };
        const results = await collection.updateOne(
            { _id: new mongo.ObjectId(id) },
            update
        );
        loggerInfo(
            `Success to update ${JSON.stringify(
                results
            )} on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to update something on ${collectionName} in mongoDB`,
            error
        );
    }
};