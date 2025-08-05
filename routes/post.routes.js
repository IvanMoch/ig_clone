import { Router } from 'express';
import { PostController } from "../Controllers/post.controller.js";
import { uploadPosts } from '../Middleware/uploadPost.js';

export const postRouter = Router();
postRouter.post('/create', uploadPosts.single('post'),PostController.newPost);
postRouter.patch('/update/:postId/', uploadPosts.single('post'),PostController.updatePost);
postRouter.delete('/delete/:postId', PostController.deletePost);
postRouter.get('/user/:userId', PostController.getPostsByUser);
postRouter.get('/', PostController.getPaginatedPosts);
