import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Post } from "../Posts/posts.model";

const checkIsPremiumAvailable = async (id: string) => {
    console.log(id);
    
    const isVoteAvailable = await Post.findOne({
        author: id,
        'voteCount.upvotes': { $gt: 0 }
      });

    if (!isVoteAvailable) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You have must One Upvote to become premium user.')
    }

    return true
};

export const PremiumService = {
    checkIsPremiumAvailable
};
