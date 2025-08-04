import { Router } from 'express';
import { LikesController } from "../Controllers/likes.controller.js";

export const likesRouter = Router();

likesRouter.post('/like', LikesController.createLike);
likesRouter.delete('/unlike', LikesController.deleteLike);
likesRouter.get('/post/:postId', LikesController.getLikesByPost);
