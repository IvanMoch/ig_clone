import { Router } from "express";
import { CommentController } from "../Controllers/commet.controller.js";

export const commentRouter = Router();

commentRouter.post('/create', CommentController.createComment);
commentRouter.delete('/delete/:commentId', CommentController.deleteComment);
