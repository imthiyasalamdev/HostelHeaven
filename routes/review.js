const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview,isLoggedIn,isOwner,isReviewAuthor} =require("../middleware.js")
const reviewController = require("../controllers/reviews.js")




// Review
// Post Review Route

router.post(
  "/",isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete(
  "/:reviewId",isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
