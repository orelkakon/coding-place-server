import express from "express";
import { findPostsController, insertPostsController, deletePostsController, updatePostsController, closePostsController } from "./../controllers/postsController";
import { findPostSchema, removePostSchema, insertNewPostSchema, updatePostSchema, closePostSchema } from "./../schemas/postsSchema"
import { validate } from "./../utils/validators";
export const postsRouter = express.Router()

postsRouter.get('/:type', validate(findPostSchema), findPostsController);
postsRouter.get('/:type/:id', validate(findPostSchema), findPostsController);
postsRouter.post('/:type', validate(insertNewPostSchema), insertPostsController);
postsRouter.delete('/:type/:id', validate(removePostSchema), deletePostsController);
postsRouter.put('/:type/:id', validate(updatePostSchema), updatePostsController);
postsRouter.put('/close/:type/:id', validate(closePostSchema), closePostsController);
