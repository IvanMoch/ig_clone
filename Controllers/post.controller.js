import { PostModel } from '../Models/post.model.js';
export class PostController{
    
    static async newPost(req, res) {
        const { userId, caption, mediaUrl, mediaType } = req.body;

        try {
            const newPost = await PostModel.createPost(userId, caption, mediaUrl, mediaType);
            if (newPost.affectedRows === 0) {
                return res.status(400).json({ error: 'Post was not created' });
            }

            return res.status(201).json({ message: 'Post created successfully', postId: newPost.insertId });
            
        } catch (error) {
            console.error('Error while creating the post:', error);
            return res.status(500).json({ error: 'Internal Error' });
        }
    }

    static async updatePost(req, res) {
        const postId = req.params.id;
        const { caption, mediaUrl, mediaType } = req.body;

        try {
            const result = await PostModel.updatePost(postId, caption, mediaUrl, mediaType);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Post not found' });
            }
            return res.status(200).json({ message: 'Post updated successfully' });
        } catch (error) {
            console.error('Error while updating the post:', error);
            res.status(500).json({ error: 'Internal Error' });
        }
    }

    static async deletePost(req, res) {
        const postId = req.params.id;

        try {
            const result = await PostModel.deletePost(postId);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Post not found' });
            }
            return res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error while deleting the post:', error);
            res.status(500).json({ error: 'Internal Error' });
        }
    }

    static async getPostsByUser(req, res) {
        const userId = req.params.userId;

        try {
            const posts = await PostModel.getPostsByUser(userId);
            if (posts.length === 0) {
                return res.status(404).json({ message: 'No posts found for this user' });
            }
            return res.status(200).json({ message: 'Posts fetched successfully', data: posts });
        } catch (error) {
            console.error('Error while fetching posts:', error);
            return res.status(500).json({ error: 'Internal Error' });
        }
    }

    static async getPaginatedPosts(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            const post = await PostModel.getPaginatedPosts(page, limit);
            return res.status(200).json({
                success: true,
                data: post,
                page: page,
                limit: limit
            });
        } catch (error) {
            console.error('Error while fetching paginated posts:', error);
            return res.status(500).json({ error: 'Internal Error' });
        }
    }
}
