import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Comment } from '../Comments/comment.model';
import { searchablePostField } from './posts.constant';
import { IPost } from './posts.interface';
import { Post } from './posts.model';

const createPost = async (files: any[], user: any, payload: IPost) => {
  const imageUrls: string[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const imageName = `images_${Math.random().toString().split('.')[1]}`;
      const path = file.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      imageUrls.push(secure_url as string);
    }
  }

  payload.imageUrls = imageUrls;
  payload.author = user;

  const post = await Post.create(payload);

  return post;
};

const getAllPosts = async (query: Record<string, unknown>) => {
  const PostQuery = new QueryBuilder(Post.find().populate('author'), query)
    .search(searchablePostField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await PostQuery.countTotal();
  const posts = await PostQuery.modelQuery;

  const postIds = posts.map((post) => post._id);

  const commentCounts = await Comment.aggregate([
    { $match: { post: { $in: postIds } } },
    { $group: { _id: '$post', commentCount: { $sum: 1 } } },
  ]);

  const commentCountMap = commentCounts.reduce((acc, comment) => {
    acc[comment._id.toString()] = comment.commentCount;
    return acc;
  }, {});

  const data = posts.map((post) => ({
    ...post.toObject(),
    commentCount: commentCountMap[post._id.toString()] || 0,
  }));

  return {
    meta,
    data,
  };
};

export const PostServices = {
  createPost,
  getAllPosts,
};
