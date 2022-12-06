import express from "express";
import { findPostsController, insertPostsController, deletePostsController, updatePostsController } from "./../controllers/postsController";
import { findPostSchema, removePostSchema, insertNewPostSchema, updatePostSchema } from "./../schemas/postsSchema"
import { validate } from "./../utils/validators";
export const postsRouter = express.Router()

postsRouter.get('/:type', validate(findPostSchema), findPostsController);
postsRouter.get('/:type/:id', validate(findPostSchema), findPostsController);
postsRouter.post('/:type', validate(insertNewPostSchema), insertPostsController);
postsRouter.delete('/:type/:id', validate(removePostSchema), deletePostsController);
postsRouter.put('/:type/:id', validate(updatePostSchema), updatePostsController);
