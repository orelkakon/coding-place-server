import express from "express";
import { findUsersController } from "./../controllers/usersController";
import { findUserSchema} from "./../schemas/usersSchema"
import { validate } from "./../utils/validators";
export const usersRouter = express.Router()

usersRouter.get('/', validate(findUserSchema), findUsersController);
usersRouter.get('/:username', validate(findUserSchema), findUsersController);
