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

// Update an existing Post

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await PostServices.updatePost(req.files as any[], id, payload);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post updated successfully',
      data: result,
  });
});

// delete an existing Post

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deletePost(id);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post deleted successfully',
      data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { id } =req.params
  const result = await PostServices.getSinglePost(id);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Posts retrieved successfully',
      data: result,
  });
});

export const PostControllers = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    getSinglePost
}