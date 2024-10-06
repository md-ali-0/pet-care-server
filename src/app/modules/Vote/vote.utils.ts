import { Post } from "../Posts/posts.model";
import { Vote } from "./vote.model";

export const updatePostVoteCount = async (postId: string) => {
    const upvotes = await Vote.countDocuments({ post: postId, type: 'upvote' });
    const downvotes = await Vote.countDocuments({ post: postId, type: 'downvote' });
  
    await Post.findByIdAndUpdate(postId, {
      $set: { voteCount: { upvotes, downvotes } },
    });
  };