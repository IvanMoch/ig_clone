import { pool } from "../db.js";
export class followersModel{
    

    static async getFollowers(userId) {
        try {
            const result = await pool.query('SELECT * FROM followers WHERE user_id = ?', [userId]);
            return result[0];
        } catch (error) {
            console.error('Error while fetching users: ', error);
            throw error;
        }
    }

    static async getFollowing(userId) {
        try {
            const result = await pool.query('SELECT * FROM followers WHERE follower_id = ?', [userId]);
            return result[0];
        } catch (error) {
            console.error('Error while fetching following users: ', error);
            throw error;
        }
    }

    static async newFollower(userId, followerId) {
        try {
            const result = await pool.query('INSERT INTO followers (user_id, follower_id) VALUES (?, ?)', [userId, followerId]);
            return result;
        } catch (error) {
            console.error('Error while adding new follower: ', error);
            throw error;
        }
    }

    static async removeFollower(userId, followerId) {
        try {
            const result = await pool.query('DELETE FROM followers WHERE user_id = ? AND follower_id = ?', [userId, followerId]);
            return result;
        } catch (error) {
            console.error('Error while removing follower: ', error);
            throw error;
        }
    }
}
