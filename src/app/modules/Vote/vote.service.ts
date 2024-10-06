import { Vote } from './vote.model';
import { updatePostVoteCount } from './vote.utils';

// Upvote post function
const upvotePost = async (userId: string, {post : postId}: {post: string}) => {

  let vote = await Vote.findOne({ user: userId, post: postId });

  if (vote && vote.type === 'upvote') {

    await Vote.deleteOne({ _id: vote._id });
  } else if (vote && vote.type === 'downvote') {

    vote.type = 'upvote';
    await vote.save();
  } else {

    await Vote.create({ user: userId, post: postId, type: 'upvote' });
  }

  const result = await updatePostVoteCount(postId);
  return result
};

// Downvote post function
const downvotePost = async (userId: string, {post : postId}: {post: string}) => {
  let vote = await Vote.findOne({ user: userId, post: postId });
  
  if (vote && vote.type === 'downvote') {

    await Vote.deleteOne({ _id: vote._id });
  } else if (vote && vote.type === 'upvote') {

    vote.type = 'downvote';
    await vote.save();
  } else {

    await Vote.create({ user: userId, post: postId, type: 'downvote' });
  }

  const result = await updatePostVoteCount(postId);
  return result
};

export const VoteServices = {
  upvotePost,
  downvotePost,
};
