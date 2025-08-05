import { pool } from "../db.js";
export class PostModel{
    

    static async createPost(userId, caption, mediaUrl, mediaType) {
        try {
            const result=  await pool.query(
                'INSERT INTO posts (user_id, caption, media_url, media_type) VALUES (?, ?, ?, ?)',
                [userId, caption, mediaUrl, mediaType])
            if (result.affectedRows === 0) {
                throw new Error('Post was not created');
            }

            return result;
        } catch (error) {
            console.error('Error while creating the post:', error);
            throw error;
        }
    }

    static async updatePost(postId, caption, mediaUrl, mediaType) {
        try {
            const result = await pool.query(
                'UPDATE posts SET caption = ?, media_url = ?, media_type = ? WHERE id = ?',
                [caption, mediaUrl, mediaType, postId]
            );
            return result;
        } catch (error) {
            console.error('Error while updating the post:', error);
            throw error;
        }
    }

    static async deletePost(postId) {
        try {
            const result = await pool.query('DELETE FROM posts WHERE id = ?', [postId]);
            return result;
        } catch (error) {
            console.error('Error while deleting the post:', error);
            throw error;
        }
    }

    static async getPostsByUser(userId) {
        try {
            const result = await pool.query('SELECT * FROM posts WHERE user_id = ?', [userId]);
            return result;
        } catch (error) {
            console.error('Error while fetching posts by user:', error);
            throw error;
        }
    }

    static async getPaginatedPosts(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const result = await pool.query('SELECT * FROM posts LIMIT ? OFFSET ?', [limit, offset]);
            return result;
        } catch (error) {
            console.error('Error while fetching paginated posts:', error);
            throw error;
        }
    }
}
