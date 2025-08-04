import { Router } from "express";
import { FollowersController } from "../Controllers/followers.controller.js";

export const followerRouter = Router();

followerRouter.post('/follow', FollowersController.newFollower);
followerRouter.delete('/unfollow', FollowersController.removeFollower);
followerRouter.get('/follows/:userId', FollowersController.getFollowers);
followerRouter.get('/following/:userId', FollowersController.getFollowing);
