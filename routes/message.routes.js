import { Router } from 'express';
import { MessageController } from "../Controllers/message.controller.js";

export const messageRouter = Router();

messageRouter.post('/create', MessageController.createMessage);
messageRouter.put('/update-status', MessageController.updateMessageStatus);
messageRouter.get('/group/:groupId', MessageController.getMessagesList);
