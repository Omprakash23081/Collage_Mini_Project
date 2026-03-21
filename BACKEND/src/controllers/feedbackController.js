import { Feedback } from "../models/feedbackModel.js";
import { ApiError } from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createFeedback = asyncHandler(async (req, res) => {
    const { feedback } = req.body;
    const userId = req.user._id;

    if (!feedback) {
        throw new ApiError(400, "Feedback content is required");
    }

    const newFeedback = await Feedback.create({
        feedback,
        user: userId
    });

    return res.status(201).json(
        new ApiResponse(200, newFeedback, "Feedback submitted successfully")
    );
});

export const getAllFeedback = asyncHandler(async (req, res) => {
    const feedbacks = await Feedback.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, feedbacks, "All feedbacks fetched successfully")
    );
});

export const getUserFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await Feedback.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, feedbacks, "User feedbacks fetched successfully")
    );
});

export const replyToFeedback = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { response } = req.body;

    if (!response) {
        throw new ApiError(400, "Response content is required");
    }

    const feedback = await Feedback.findByIdAndUpdate(
        id,
        { 
            response,
            respondedAt: Date.now()
        },
        { new: true }
    );

    if (!feedback) {
        throw new ApiError(404, "Feedback not found");
    }

    return res.status(200).json(
        new ApiResponse(200, feedback, "Reply sent successfully")
    );
});

export const deleteFeedback = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const feedback = await Feedback.findById(id);

    if (!feedback) {
        throw new ApiError(404, "Feedback not found");
    }

    await Feedback.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Feedback deleted successfully")
    );
});

export const markFeedbackRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
    );

    if (!feedback) {
        throw new ApiError(404, "Feedback not found");
    }

    return res.status(200).json(
        new ApiResponse(200, feedback, "Feedback marked as read")
    );
});
