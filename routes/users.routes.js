import { Router } from 'express';
import { UsersController } from "../Controllers/users.controller.js";

export const userRouter = new Router();


userRouter.post('/register', UsersController.createUser);
userRouter.post('/login', UsersController.logUser);
userRouter.get('/:username', UsersController.getUserByUserName);
userRouter.patch('/:id', UsersController.updateUser);
userRouter.delete('/:id', UsersController.deleteUser);
