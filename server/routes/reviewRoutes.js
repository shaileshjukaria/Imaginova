import express from 'express';
import { createReview, getApprovedReviews, getUserReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import userAuth from '../middlewares/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/create', userAuth, createReview);
reviewRouter.get('/approved', getApprovedReviews);
reviewRouter.get('/user-review', userAuth, getUserReview);
reviewRouter.put('/update', userAuth, updateReview);
reviewRouter.delete('/delete', userAuth, deleteReview);

export default reviewRouter;
