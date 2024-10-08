import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PremiumService } from "./premium.service";

const checkIsPremiumAvailable = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await PremiumService.checkIsPremiumAvailable(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment created successfully',
        data: result,
    });
});

export const PremiumController = {
    checkIsPremiumAvailable,
};
