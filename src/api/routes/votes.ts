import express from "express";
import { votePostController } from "../controllers/votesController";
import { votesPostsSchema } from "../schemas/votesSchema";
import { validate } from "../utils/validators";
export const votesRouter = express.Router()

votesRouter.post('/:type/:id', validate(votesPostsSchema), votePostController);
