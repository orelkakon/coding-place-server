import express from "express";
import { insertCommentController, deleteCommentController, updateCommentController, markCommentController } from "../controllers/commentsController";
import { insertCommentsSchema, deleteCommentsSchema, updateCommentsSchema, markCommentsSchema } from "../schemas/commentsSchema";
import { validate } from "../utils/validators";
export const commentsRouter = express.Router()

commentsRouter.post('/:type/:id', validate(insertCommentsSchema), insertCommentController);
commentsRouter.delete('/:type/:id', validate(deleteCommentsSchema), deleteCommentController);
commentsRouter.put('/:type/:id', validate(updateCommentsSchema), updateCommentController);
commentsRouter.put('/mark/:type/:id', validate(markCommentsSchema), markCommentController);
