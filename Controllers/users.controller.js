import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SECRET_WORD } from "../config.js";
import { UsersModel } from "../Models/users.model.js"
export class UsersController {
    

    async getUsers(req, res) {
        try {
            const [rows] = await UsersModel.getAllUsers();
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error while getting the users:', error);
            res.status(500).json({ error: 'Internal Error' });

        }
    }

    static async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const [user] = await UsersModel.getUserById(userId);

            if (user.length === 0) {
                return res.status(4040).json({ error: 'User not found' });
            }
            if (user.length > 1) {
                return res.status(409).json({ error: 'Multiple users found' });
            }

            return res.status(200).json(user[0])
        } catch (error) {
            console.error('Error while getting the user by ID: ', error);
            res.status(500).json({ error: 'Internal Error' });
        }
    }

    static async verifyUser(req, res) {
        const { email } = req.body;
        try {
            const user = await UsersModel.verifyUser(email);
            if (user.length === 0) {
                return res.status(404).json({ res: false })
            }
            return res.status(200).json({ res: true });
        } catch (error) {
            console.error('Error while verifying the user: ', error);
            res.status(500).json({ error: 'Internal Error' })
        }

    }

    static async createUser(req, res) {
        const { userName, email, password } = req.body;

        try {
            const user = await UsersModel.createUser(userName, email, password);
            if (user.affectedRows === 0) {
                return res.status(400).json({ error: 'User was not created' });
            }
            return res.status(201).json({ message: 'User was created successfully', userId: user.insertId });
        } catch (error) {
            console.error('Error while creating the user:', error);
            return res.status > (500).json({ error: 'Internal Error' });
        }
    }

    static async updateUser(req, res) {
        const userId = req.params.id;
        const { userName, email, password } = req.body;

        try {
            const result = await UsersModel.updateUser(userId, userName, email, password);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error while updating the user:', error);
            res.status(500).json({ error: 'Internal Error' });
        }
    }
    static async deleteUser(req, res) {
        const userId = req.params.id;

        try {
            const result = await UsersModel.deleteUser(userId);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error while deleting the user:', error);
            res.status(500).json({ error: 'Internal Error' });
        }
    }

    static async getUserByUserName(req, res) {
        const userName = req.params.userName;

        try {
            const user = await UsersModel.getUserByUserName(userName);
            if (user.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user[0]);
        } catch (error) {
            console.error('Error while getting the user by username:', error);
            res.status(500).json({ error: 'Internal Error' });
        }   
    }

    static async logUser(req, res) {
        const { userName, password } = req.body;

        try {
            const [user] = await UsersModel.getUserByUsername(userName);
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const token = jwt.sign({ userId: user.user_id }, SECRET_WORD, { expiresIn: '7D' });

            return res.status(200).cookie('access_token', token).json(user);

        } catch (error) {
            console.error('Error while logging in the user:', error);
            res.status(500).json({ error: 'Internal Error' });
        }
    }
}
