import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    feedback: {
        type: String,
        required: true,
        trim: true
    },
    response: {
        type: String,
        default: null
    },
    respondedAt: {
        type: Date,
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
