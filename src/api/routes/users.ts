import express from "express";
import { findUsersController } from "./../controllers/usersController";
import { findUserSchema} from "./../schemas/usersSchema"
import { validate } from "./../utils/validators";
export const usersRouter = express.Router()

usersRouter.get('/', validate(findUserSchema), findUsersController);
usersRouter.get('/:username', validate(findUserSchema), findUsersController);
// usersRouter.get('/:type/:id', validate(finduserschema), findusersController);
// usersRouter.post('/:type', validate(insertNewuserschema), insertusersController);
// usersRouter.delete('/:type/:id', validate(removeuserschema), deleteusersController);
// usersRouter.put('/:type/:id', validate(updateuserschema), updateusersController);
// usersRouter.put('/close/:type/:id', validate(closeuserschema), closeusersController);
