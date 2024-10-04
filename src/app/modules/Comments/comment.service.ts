import QueryBuilder from '../../builder/QueryBuilder';
import { IComment } from './comment.interface';
import { Comment } from './comment.model';

const createComment = async (user: any, payload: IComment) => {

  payload.author = user;

  const comment = await Comment.create(payload);

  return comment;
};

const getAllComments = async (query: Record<string, unknown>) => {
  const CommentQuery = new QueryBuilder(Comment.find().populate('author'), query)
      .filter()
      .sort()
      .paginate()
      .fields();

  const meta = await CommentQuery.countTotal();
  const data = await CommentQuery.modelQuery;

  return {
      meta,
      data,
  };
};

const updateComment = async (
  id: string,
  payload: IComment,
): Promise<IComment | null> => {
  const result = await Comment.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteComment = async (id: string): Promise<IComment | null> => {
  const result = await Comment.findByIdAndDelete(id);
  return result;
};

const getSingleComment = async (id: string): Promise<IComment | null> => {
  const result = await Comment.findById(id);
  return result;
};

export const CommentServices = {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
  getSingleComment
};
