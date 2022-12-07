import express from "express";
import { insertCommentController, deleteCommentController, updateCommentController } from "../controllers/commentsController";
import { insertCommentsSchema, deleteCommentsSchema, updateCommentsSchema } from "../schemas/commentsSchema";
import { validate } from "../utils/validators";
export const commentsRouter = express.Router()

commentsRouter.post('/:type/:id', validate(insertCommentsSchema), insertCommentController);
commentsRouter.delete('/:type/:id', validate(deleteCommentsSchema), deleteCommentController);
commentsRouter.put('/:type/:id', validate(updateCommentsSchema), updateCommentController);
