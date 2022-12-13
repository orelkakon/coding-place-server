import * as mongo from "mongodb";
import config from "config";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from "./.."
import { Comment } from "../../api/utils/types";
import { closePost } from "../postsQueries";

const dbName: string = config.get("mongo.dbName");

export const insertNewComment = async (collectionName: string, id: string, data: Comment) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const insertResult = await collection.updateOne(
            { _id: new mongo.ObjectId(id) },
            { $push: { comments: data } }
        );
        loggerInfo(`Success to insert new comment to ${collectionName} in mongoDB`);
        return insertResult;
    } catch (error: any) {
        loggerError(
            `Failed to insert new commwnt to ${collectionName} in mongoDB. ${error}`
        );
    }
};

export const deleteComment = async (collectionName: string, id: string, commentId: string) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const results = await collection.updateOne(
            { _id: new mongo.ObjectId(id) },
            {
                $pull: { comments: { commentId } }
            });
        loggerInfo(
            `Success to delete comment on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to delete comment on ${collectionName} in mongoDB. ${error}`
        );
    }
};

export const updateComment = async (
    collectionName: string,
    id: string,
    commentId: string,
    newContent: string
) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const updateData = {
            $set: { "comments.$.content": newContent },
        };
        const results = await collection.updateOne(
            { _id: new mongo.ObjectId(id), "comments.commentId": commentId },
            updateData
        );
        loggerInfo(
            `Success to update comment on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to update comment on ${collectionName} in mongoDB. ${error}`
        );
    }
};

export const markComment = async (
    collectionName: string,
    id: string,
    commentId: string,
) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const updateData = {
            $set: { "comments.$.marked": true },
        };
        const results = await collection.updateOne(
            { _id: new mongo.ObjectId(id), "comments.commentId": commentId },
            updateData
        );
        await closePost(collectionName, id)
        loggerInfo(
            `Success to mark comment on ${collectionName} in mongoDB`
        );
        return results;
    } catch (error: any) {
        loggerError(
            `Failed to mark comment on ${collectionName} in mongoDB. ${error}`
        );
    }
};
