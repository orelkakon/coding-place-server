import config from "config"
import bcrypt from "bcryptjs";
import { signUp, signIn } from "../../db/authQueries"
import { AuthConfig } from "../../utils/types"
import { User } from "../utils/types";
import { verifyUserLogin } from "./../../db/authQueries/utils"
const { salt } = config.get<AuthConfig>("auth.salt")

export const signUpController = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const phone = req.body.phone
    const passwordHashed = await bcrypt.hash(password, salt);

    try {
        const data: User = {
            username, password: passwordHashed, email, phone
        }
        const results = await signUp(data)
        res.send(results)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const signInController = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const response = await verifyUserLogin(username, password);
        if (response.status === 'ok') {
            // storing our JWT web token (response.data) as a cookie in our browser
            res.cookie('token', response.data, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
            res.redirect('/');
        } else {
            res.json(response);
        }
    } catch (error) {
        res.sendStatus(500)
    }
}
