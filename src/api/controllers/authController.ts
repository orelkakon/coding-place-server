import config from "config"
import bcrypt from "bcryptjs";
import { signUp, signIn } from "../../db/authQueries"
import { AuthConfig } from "../../utils/types"
import { User } from "../utils/types";
import { verifyUserLogin } from "./../../db/authQueries/utils"
import { getDemoProfileImage } from "./../utils/functions"
const { salt } = config.get<AuthConfig>("auth.salt")

export const signUpController = async (req, res, next) => {
    const username = req.body.user
    const password = req.body.password
    const sex = req.body.sex
    const email = req.body.email
    const phone = req.body.phone
    const passwordHashed = bcrypt.hashSync(password, salt);
    try {
        const profile: string = getDemoProfileImage(sex)
        const data: User = {
            username, password: passwordHashed, email, sex, phone, image: profile
        }
        const results = await signUp(data)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const signInController = async (req, res) => {
    const username = req.body.user
    const password = req.body.password

    try {
        const response = await verifyUserLogin(username, password);
        if (response.status === 'ok') {
            // storing our JWT web token (response.data) as a cookie in our browser
            res.cookie('token', response.data, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
            res.send("successfully login");
        } else {
            res.status(response.code).send(response.error);
            return;
        }
    } catch (error) {
        res.sendStatus(500)
    }
}
