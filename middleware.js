const Listing = require("./models/listings");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

// Authentication

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

// To save and go to same path as required eg edit -> edit

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Owner & their Listings
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  // Check if the current user is the owner of the listing
  if (!req.user || !listing.owner._id.equals(req.user._id)) {
    req.flash("error", "You don't have permission to update this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0].message); // Fix the error handling
  } else {
    next();
  }
};

// Review Middleware
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, res.err);
  } else {
    next();
  }
};

// Author of Review Ownership
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  // Check if the current user is the author of the review
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have permission to update this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
