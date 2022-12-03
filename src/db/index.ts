import { MongoClient } from "mongodb"
import config from "config"
import { loggerError, loggerInfo } from "../utils/logger"

const mongoURL: string = config.get("mongo.url")
const dbName: string = config.get("mongo.dbName")
const client = new MongoClient(mongoURL)

export const connect = async () => {
    try {
        await client.connect();
        loggerInfo("Success to connect mongoDB")
    } catch (error) {
        loggerError(error)
    }
} 

export const disconnect = () => {
    client.close();
}

export const insertNewPost = async (collectionName: string, data) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const insertResult = await collection.insertMany(data);
        loggerInfo(`Success to insert ${data} to ${collectionName} in mongoDB`);
        return insertResult;
    } catch (error) {
        loggerError(`Failed to insert ${data} to ${collectionName} in mongoDB`);
    }
}

export const findPosts = async (collectionName: string, filter = {}) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const results = await collection.find(filter).toArray();
        loggerInfo(`Success to find ${JSON.stringify(results)} on ${collectionName} in mongoDB`);
        return results;
    } catch (error) {
        loggerError(`Failed to find something on ${collectionName} in mongoDB`);
    }
}

export const removePosts = async (collectionName: string, filter = {}) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const results = await collection.deleteMany(filter);
        loggerInfo(`Success to delete ${JSON.stringify(results)} on ${collectionName} in mongoDB`);
        return results;
    } catch (error) {
        loggerError(`Failed to delete something on ${collectionName} in mongoDB`);
    }
}

export const updatePosts = async (collectionName: string, filter = {}, update = {}) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const results = await collection.updateMany(filter, update);
        loggerInfo(`Success to update ${JSON.stringify(results)} on ${collectionName} in mongoDB`);
        return results;
    } catch (error) {
        loggerError(`Failed to update something on ${collectionName} in mongoDB`);
    }
}