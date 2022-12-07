import * as mongo from "mongodb";
import config from "config";
import { Post } from "../../api/utils/types";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from "./.."

const dbName: string = config.get("mongo.dbName");

export const insertNewPost = async (collectionName: string, data: Post) => {
    console.log(collectionName);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const insertResult = await collection.insertOne(data);
        loggerInfo(`Success to insert ${data} to ${collectionName} in mongoDB`);
        return insertResult;
    } catch (error: any) {
        loggerError(
            `Failed to insert ${data} to ${collectionName} in mongoDB`,
            error
        );
    }
};

export const findPosts = async (
    collectionName: string,
    id?: string | undefined
) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        if (!id) {
            const results = await collection.find({}).toArray();
            loggerInfo(
                `Success to find ${JSON.stringify(
                    results
                )} on ${collectionName} in mongoDB`
            );
            return results;
        }
        const results = await collection
            .find({ _id: new mongo.ObjectId(id) })
            .toArray();
        loggerInfo(
            `Success to find ${JSON.stringify(
                results
            )} on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to find something on ${collectionName} in mongoDB`,
            error
        );
        throw error;
    }
};

export const removePosts = async (collectionName: string, id: string) => {
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

export const updatePosts = async (
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
            `Failed to update something on ${collectionName} in mongoDB`,
            error
        );
    }
};

export const closePost = async (
    collectionName: string,
    id: string,
) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const updateData = {
            $set: { closed: true },
        };
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
            `Failed to update something on ${collectionName} in mongoDB`,
            error
        );
    }
};
