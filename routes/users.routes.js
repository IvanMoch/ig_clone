import { Router } from 'express';
import { UsersController } from "../Controllers/users.controller.js";
import { uploadUserPhoto } from '../Middleware/uploadUserPhoto.js';

export const userRouter = new Router();


userRouter.post('/register', uploadUserPhoto.single('profilePhoto') ,UsersController.createUser);
userRouter.post('/login', uploadUserPhoto.single('post'),UsersController.logUser);
userRouter.get('/:username', UsersController.getUserByUserName);
userRouter.patch('/:id', UsersController.updateUser);
userRouter.delete('/:id', UsersController.deleteUser);
