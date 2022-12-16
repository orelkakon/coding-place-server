
import express from "express";
import { profileImageController } from "../controllers/imagesController";
import { profileImageSchema } from "../schemas/imagesSchema"
import { validate } from "../utils/validators";
export const imagesRouter = express.Router()

imagesRouter.post('/profile/:username', validate(profileImageSchema), profileImageController);

