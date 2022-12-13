import * as mongo from "mongodb";
import config from "config";
import { Post } from "../../api/utils/types";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from "./.."

const dbName: string = config.get("mongo.dbName");

export const insertNewPost = async (collectionName: string, data: Post) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const insertResult = await collection.insertOne(data);
        loggerInfo(`Success to insert new post to ${collectionName} in mongoDB`);
        return insertResult;
    } catch (error: any) {
        loggerError(
            `Failed to insert new post to ${collectionName} in mongoDB. ${error}`
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
            `Success to find post on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to find post on ${collectionName} in mongoDB. ${error}`
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
            `Success to delete post on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to delete post on ${collectionName} in mongoDB. ${error}`
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
            $set: { ...update }
        };  
        const results = await collection.updateOne(
            { _id: new mongo.ObjectId(id) },
            updateData
        );
        loggerInfo(
            `Success to update post on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to update post on ${collectionName} in mongoDB. ${error}`
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
            `Success to close post on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to close post on ${collectionName} in mongoDB. ${error}`
        );
    }
};
