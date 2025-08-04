import { CommentModel } from "../Models/commet.model.js";
export class CommentController{
    static async createComment(req, res) {
        const { userId, postId, content } = req.body;
        try {
            const result = await CommentModel.createComment(userId, postId, content);
            return res.status(201).json({ message: 'Comment created successfully', data: result });
        } catch (error) {
            console.error('Error while creating comment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteComment(req, res) {
        const { commentId } = req.params;
        try {
            const result = await CommentModel.deleteComment(commentId);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            return res.status(200).json({ message: 'Comment deleted successfully', data: result });
        } catch (error) {
            console.error('Error while deleting comment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
