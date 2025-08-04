import { Router } from 'express';
import { PostController } from "../Controllers/post.controller.js";

export const postRouter = Router();
postRouter.post('/create', PostController.newPost);
postRouter.patch('/update/:postId/', PostController.updatePost);
postRouter.delete('/delete/:postId', PostController.deletePost);
postRouter.get('/user/:userId', PostController.getPostsByUser);
postRouter.get('/', PostController.getPaginatedPosts);
