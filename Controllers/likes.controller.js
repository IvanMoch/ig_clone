import { LikesModel } from "../Models/likes.model.js";
export class LikesController {
    

    static async createLike(req, res) {
        const { userId, postId } = req.body;
        try {
            const result = await LikesModel.createLike(userId, postId);
            
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Like was not created" });
            }

            return res.status(201).json({ message: 'Like created successfully', data: result });
        } catch (error) {
            console.error('Error while creating like:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteLike(req, res) {
        const { userId, postId } = req.body;
        try {
            const result = await LikesModel.deleteLike(userId, postId);
            
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Like was not deleted" });
            }

            return res.status(200).json({ message: 'Like deleted successfully', data: result });
        } catch (error) {
            console.error('Error while deleting like:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getLikesByPost(req, res) {
        const postId = req.params.postId;
        try {
            const result = await LikesModel.getLikesByPost(postId);
            return res.status(200).json({ message: 'Likes fetched successfully', data: result });
        } catch (error) {
            console.error('Error while fetching likes:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
