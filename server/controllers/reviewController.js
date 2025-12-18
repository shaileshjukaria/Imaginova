import reviewModel from "../models/reviewModel.js";

const createReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const userId = req.userId;

        if (!rating || !review) {
            return res.json({success: false, message: "Rating and review are required"});
        }

        if (rating < 1 || rating > 5) {
            return res.json({success: false, message: "Rating must be between 1 and 5"});
        }

        // Check if user already submitted a review
        const existingReview = await reviewModel.findOne({ userId });
        if (existingReview) {
            return res.json({success: false, message: "You have already submitted a review"});
        }

        const newReview = new reviewModel({
            userId,
            userName: req.user.name,
            rating,
            review
        });

        await newReview.save();
        res.json({success: true, message: "Review submitted successfully and is pending approval"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

const getApprovedReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ isApproved: true })
            .sort({ createdAt: -1 })
            .limit(50);
        
        res.json({success: true, reviews});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

const getUserReview = async (req, res) => {
    try {
        const userId = req.userId;
        const review = await reviewModel.findOne({ userId });
        
        if (!review) {
            return res.json({success: true, hasReview: false});
        }
        
        res.json({success: true, hasReview: true, review});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

const updateReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const userId = req.userId;

        if (!rating || !review) {
            return res.json({success: false, message: "Rating and review are required"});
        }

        if (rating < 1 || rating > 5) {
            return res.json({success: false, message: "Rating must be between 1 and 5"});
        }

        const existingReview = await reviewModel.findOne({ userId });
        if (!existingReview) {
            return res.json({success: false, message: "Review not found"});
        }

        existingReview.rating = rating;
        existingReview.review = review;
        existingReview.isApproved = false; // Reset approval status
        await existingReview.save();

        res.json({success: true, message: "Review updated successfully and is pending approval"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

const deleteReview = async (req, res) => {
    try {
        const userId = req.userId;
        const review = await reviewModel.findOneAndDelete({ userId });
        
        if (!review) {
            return res.json({success: false, message: "Review not found"});
        }
        
        res.json({success: true, message: "Review deleted successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

export { createReview, getApprovedReviews, getUserReview, updateReview, deleteReview };
