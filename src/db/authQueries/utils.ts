
import config from "config";
import bcrypt from "bcryptjs";
import { client } from "./..";
import jwt from "jsonwebtoken";
import { AuthConfig } from "../../utils/types";
import { loggerError } from "../../utils/logger";

const dbName: string = config.get("mongo.dbName");
const { secret } = config.get<AuthConfig>("auth")

interface JwtPayload {
    type: string
}

export const verifyUserLogin = async (username: string, password: string) => {
    const collectionName = "users"
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const user = await collection.findOne({ username })
        if (!user) {
            return { status: 'error', error: 'user not found' }
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, username: user.username, type: 'user' }, secret, { expiresIn: '2h' })
            return { status: 'ok', data: token }
        }
        return { status: 'error', error: 'invalid password' }
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'timed out' }
    }
}

export const verifyToken = (token: string) => {
    try {
        const verify = jwt.verify(token, secret) as JwtPayload;
        if (verify.type === 'user') { return true; }
        else { return false };
    } catch (error) {
        loggerError("Failed to verify token", JSON.stringify(error));
        return false;
    }
}
