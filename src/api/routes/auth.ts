import express from "express";
import { signInController, signUpController } from "../controllers/authController";
import { signInSchema, signUpSchema } from "../schemas/authSchema";
import { validate } from "../utils/validators";
export const authRouter = express.Router()

authRouter.post('/signup', validate(signUpSchema), signUpController);
authRouter.post('/signin', validate(signInSchema), signInController);
