
import express from "express";
import { profileImageController } from "../controllers/imagesController";
import { uploadProfileImageSchema } from "../schemas/imagesSchema"
import { validate } from "../utils/validators";
export const imagesRouter = express.Router()

imagesRouter.post('/profile/:username', validate(uploadProfileImageSchema), profileImageController);

