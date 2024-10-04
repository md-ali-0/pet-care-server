import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./posts.service";

const createPost = catchAsync(async (req, res) => {
    const { user } = req.user
    const post = await PostServices.createPost(req.files as any[], user, req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post Created Successfully',
      data: post,
    });
  });

// Retrieve all posts

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPosts(req.query);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Posts retrieved successfully',
      data: result.data,
      meta: result.meta
  });
});

export const PostControllers = {
    createPost,
    getAllPosts
}