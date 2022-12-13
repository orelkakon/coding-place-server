import * as mongo from "mongodb";

export type AuthConfig = {
    salt: number;
    secret: string;
}

export type MongoFilter = {
    _id: mongo.ObjectId,
    author?: string
}