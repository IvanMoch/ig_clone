import { MessageModel } from "../Models/messages.model.js";

export class MessageController{
    
    static async createMessage(req, res) {
        const { senderId, receiverId, content, messageType, status } = req.body;
        try {
            const result = await MessageModel.createMessage(senderId, receiverId, content, messageType, status);

            if (result.affectedRows === 0) {
                return res.status(400).json({ message: 'Message was not created' });
            }

            return res.status(201).json({ message: 'Message created successfully', data: result})
        } catch (error) {
            console.error('Error while creating message:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateMessageStatus(req, res) {
        const { messageId, status } = req.body;
        try {
            const result = await MessageModel.updateStatus(messageId, status)
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: 'Message was not created successfully' });
            }

            return res.status(200).json({ message: 'Message created successfully', data: result });
        } catch (error) {
            console.error('Error while updating the message: ', error);
            return res.status(500).json({ message: 'Internal Error' });
        }
    }

    static async getMessagesList(req, res) {
        const { receiverId, senderId } = req.params;

        try {
            const messages = await MessageModel.getMessagesByGroup(senderId, receiverId);
            if (messages.length === 0) {
                return res.status(404).json({ message: 'No messages found for this group' });
            }
            return res.status(200).json({ message: 'Messages fetched successfully', data: messages[0] });
        } catch (error) {
            console.error('Error while fetching messages:', error);
            return res.status(500).json({ message: 'Internal Error' });
        }
    }
}
