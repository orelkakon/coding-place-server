import express from "express";
import { insertCommentController } from "../controllers/commentsController";
import { commentsSchema } from "../schemas/commentsSchema";
import { validate } from "../utils/validators";
export const commentsRouter = express.Router()

commentsRouter.post('/:type/:id', validate(commentsSchema), insertCommentController);
