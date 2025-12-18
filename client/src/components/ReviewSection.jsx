import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react"
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewSection = () => {
  const { backendUrl, token, user } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [hasReview, setHasReview] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchApprovedReviews = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/review/approved');
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkUserReview = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(backendUrl + '/api/review/user-review', {
        headers: { token }
      });
      if (data.success) {
        setHasReview(data.hasReview);
        if (data.hasReview) {
          setUserReview(data.review);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
    checkUserReview();
  }, [token]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Please login to submit a review');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    try {
      const endpoint = isEditing ? '/api/review/update' : '/api/review/create';
      const { data } = await axios({
        method: isEditing ? 'put' : 'post',
        url: backendUrl + endpoint,
        data: { rating, review: reviewText },
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        setShowReviewForm(false);
        setReviewText('');
        setRating(5);
        setIsEditing(false);
        checkUserReview();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditReview = () => {
    if (userReview) {
      setRating(userReview.rating);
      setReviewText(userReview.review);
      setIsEditing(true);
      setShowReviewForm(true);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm('Are you sure you want to delete your review?')) return;

    try {
      const { data } = await axios.delete(backendUrl + '/api/review/delete', {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        setUserReview(null);
        setHasReview(false);
        fetchApprovedReviews();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-20 py-12'>
      
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
        Customer Reviews
      </h1>

      <p className='text-gray-500 mb-8'>What our users are saying</p>

      {/* Write Review Button */}
      {token && (
        <div className='mb-8'>
          {!hasReview ? (
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className='bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all'
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          ) : (
            <div className='flex gap-4'>
              <button 
                onClick={handleEditReview}
                className='bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all'
              >
                Edit Your Review
              </button>
              <button 
                onClick={handleDeleteReview}
                className='bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all'
              >
                Delete Review
              </button>
            </div>
          )}
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className='bg-white/20 p-8 rounded-lg shadow-md border w-full max-w-2xl mb-12'
        >
          <h3 className='text-xl font-semibold mb-4'>
            {isEditing ? 'Edit Your Review' : 'Share Your Experience'}
          </h3>
          <form onSubmit={handleSubmitReview}>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Rating</label>
              <div className='flex gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() => setRating(star)}
                    className='text-3xl transition-transform hover:scale-110'
                  >
                    {star <= rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder='Tell us about your experience...'
                className='w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500'
                rows='4'
                required
              />
            </div>
            <button 
              type='submit'
              className='bg-orange-500 text-white px-8 py-2 rounded-full hover:bg-orange-600 transition-all'
            >
              {isEditing ? 'Update Review' : 'Submit Review'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Display Reviews */}
      <div className='flex flex-wrap gap-6 justify-center max-w-6xl'>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div 
              key={review._id} 
              className='bg-white/20 p-8 rounded-lg shadow-md border w-80 hover:scale-[1.02] transition-all'
            >
              <div className='flex flex-col items-center'>
                <div className='w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3'>
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <h2 className='text-xl font-semibold'>{review.userName}</h2>
                <div className='flex my-3'>
                  {Array(review.rating).fill().map((_, index) => (
                    <span key={index} className='text-yellow-500 text-xl'>⭐</span>
                  ))}
                </div>
                <p className='text-center text-sm text-gray-600'>{review.review}</p>
                <p className='text-xs text-gray-400 mt-3'>
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No reviews yet. Be the first to review!</p>
        )}
      </div>

    </motion.div>
  )
}

export default ReviewSection
