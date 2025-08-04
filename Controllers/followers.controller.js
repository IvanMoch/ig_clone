export class FollowersController {
    

    static async getFollowers(req, res) {
        const userId = req.params.userId;
        try {
            const result = await followersModel.getFollowers(userId);
            return res.status(200).json({ message: 'Followers fetched successfully', data: result });
        } catch (error) {
            console.error('Error while fetching followers:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getFollowing(req, res) {
        const userId = req.params.userId;
        try {
            const result = await followersModel.getFollowing(userId);
            return res.status(200).json({ message: 'Following fetched successfully', data: result });
        } catch (error) {
            console.error('Error while fetching following:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    static async newFollower(req, res) {
        const { userId, followerId } = req.body;
        try {
            const result = await followersModel.newFollower(userId, followerId);
            return res.status(201).json({ message: 'New follower added successfully', data: result });
        } catch (error) {
            console.error('Error while adding the follower: ', error);
            return res.status(500).json({ message: 'Internal Error' });
        }
    }

    static async removeFollower(req, res) {
        const { userId, followerId } = req.body;
        try {
            const result = await followersModel.removeFollower(userId, followerId);
            return res.status(200).json({ message: 'Follower removed successfully', data: result });
        } catch (error) {
            console.error('Error while removing the follower: ', error);
            return res.status(500).json({ message: 'Internal Error' });
        }
    }


}
