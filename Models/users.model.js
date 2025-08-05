import bcrypt from "bcryptjs";
import { pool } from "../db.js";
export class UsersModel{
    
    static async getAllUsers() {
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    }

    static async getUserById(userId) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
            return rows;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }

    static async verifyUser(email) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows;
        } catch (error) {
            console.error('Error verifying user:', error);
            throw error;
        }
    }

    static async createUser(userName, email, password, bio, profilePic) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await pool.query('INSERT INTO users (username, email, password_hash, bio, profile_pic) VALUES (?, ?, ?, ?, ?)', [userName, email, hashedPassword, bio, profilePic]);
            return result;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async updateUser(userId, userName, email, password, bio, profilePic) {
        try {
            const [result] = await pool.query('UPDATE users SET username = ?, email = ?, password_hash = ?, bio = ?, profile_pic = ? WHERE user_id = ?', [userName, email, password, userId, bio, profilePic]);
            return result;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);
            return result;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    static async getUserByUsername(username) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            return rows;
        } catch (error) {
            console.error('Error fetching user by username:', error);
            throw error;
        }
    }

}
