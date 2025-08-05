import { pool } from "../db.js";
export class MessageModel {
    
    static async createMessage(senderId, receiverId, content, messageType, status) {
        try {
            const result = await pool.query(
                'INSERT INTO private_messages (sender_id, receiver_id, content, message_type, status) VALUES (?, ?, ?, ?, ?)',
                [senderId, receiverId, content, messageType, status]
            );
            if (result.affectedRows === 0) {
                throw new Error('Message was not created');
            }
            return result;
        } catch (error) {
            console.error('Error while saving the message: ', error);
            throw error;
        }
    }

    static async updateStatus(messageId, status) {
        try {
            const result = await pool.query(
                'UPDATE private_messages SET status = ? WHERE message_id = ?',
                [status, messageId]
            );
        }catch(error) {
            console.error('Error while updating the message status: ', error);
            throw error;
        }
    }

    static async getMessagesByGroup(senderId, receiverId) {
        try {
            const result = await pool.query(
                'SELECT * FROM private_messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)',
                [senderId, receiverId, receiverId, senderId]
            );
            return result;
        } catch (error) {
            console.error('Error while fetching messages by group: ', error);
            throw error;
        }
    }
}
