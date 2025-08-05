
import { pool } from "../db.js";
export class LikesModel{
    

    static async createLike(userId, postId) {
        try {
            const result = await pool.query('INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [userId, postId]);
            return result;
        } catch (error) {
            console.error('Error while creating like: ', error);
        }
    }

    static async deleteLike(userId, postId) {
        try {
            const result = await pool.query('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);
            return result;
        } catch (error) {
            console.error('Error while deleting like: ', error);
        }
    }

    static async getLikesByPost(postId) {
        try {
            const result = await pool.query('SELECT * FROM likes WHERE post_id = ?', [postId]);
            return result[0];
        } catch (error) {
            console.error('Error while fetching likes: ', error);
        }
    }
}
