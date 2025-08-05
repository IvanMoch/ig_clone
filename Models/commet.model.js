import { pool } from "../db.js";
export class CommentModel {
    

    static async createComment(userId, postId, content) {
        try {
            const result = await pool.query('INSERT INTO comments (user_id, post_id, text) VALUES (?, ?, ?)', [userId, postId, content]);
            return result;
        } catch (error) {
            console.error('Error while creating comment: ', error);
            throw error;
        }
    }

    static async deleteComment(commentId) {
        try {
            const result = await pool.query('DELETE FROM comments WHERE comment_id = ?', [commentId]);
            return result;
        } catch (error) {
            console.error('Error while deleting comment: ', error);
            throw error;
        }
    }
}
