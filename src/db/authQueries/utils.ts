
import config from "config";
import bcrypt from "bcryptjs";
import { client } from "./..";
import jwt from "jsonwebtoken";
import { AuthConfig } from "../../utils/types";
import { loggerError } from "../../utils/logger";

const dbName: string = config.get("mongo.dbName");
const { secret } = config.get<AuthConfig>("auth")
const collectionName = "users"
const db = client.db(dbName);

interface JwtPayload {
    type: string
}

export const verifyUserLogin = async (username: string, password: string) => {
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
        loggerError(error);
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

export const checkDuplicateUsernameOrEmail = (req, res, next) => {
    const collection = db.collection(collectionName);
    // Username
    collection.findOne({
        username: req.body.username
    }, ((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        // Email
        collection.findOne({
            email: req.body.email
        }, ((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }
            next();
        }));
    }));
}; 