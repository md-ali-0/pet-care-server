import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VoteServices } from "./vote.service";

const upvotePost = catchAsync(async (req, res) => {
    const { user } = req.user
    const result = await VoteServices.upvotePost(user, req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'UpVote Created Successfully',
      data: result,
    });
  });

const downvotePost = catchAsync(async (req, res) => {
    const { user } = req.user
    const result = await VoteServices.downvotePost(user, req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'DownVote Created Successfully',
      data: result,
    });
  });

export const VoteControllers = {
  upvotePost,
  downvotePost
}