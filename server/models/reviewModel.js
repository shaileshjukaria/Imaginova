import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;
