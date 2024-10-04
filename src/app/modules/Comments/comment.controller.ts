import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
    const { user } = req.user
    const result = await CommentServices.createComment(user, req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment Created Successfully',
      data: result,
    });
  });

// Retrieve all posts

const getAllComments = catchAsync(async (req, res) => {
  const result = await CommentServices.getAllComments(req.query);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment retrieved successfully',
      data: result.data,
      meta: result.meta
  });
});

// Update an existing Comment

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CommentServices.updateComment(id, payload);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment updated successfully',
      data: result,
  });
});

// delete an existing Comment

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.deleteComment(id);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment deleted successfully',
      data: result,
  });
});

const getSingleComment = catchAsync(async (req, res) => {
  const { id } =req.params
  const result = await CommentServices.getSingleComment(id);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comments retrieved successfully',
      data: result,
  });
});

export const CommentControllers = {
    createComment,
    getAllComments,
    updateComment,
    deleteComment,
    getSingleComment
}