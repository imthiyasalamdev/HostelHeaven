const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const { isOwner, validateListing, isLoggedIn } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index
router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn, // Middleware to check if user is logged in
  upload.single("Listing[image]"), // Multer middleware to handle single file upload with field name 'Listing[image]'
  wrapAsync(listingController.createNewListing) // Controller function to handle form submission
);
// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);
router
  .route("/:id")
  .get(listingController.showListing)    //show
  .put(isLoggedIn, isOwner,upload.single("Listing[image]"), listingController.updateListing) //update
  .delete(isLoggedIn, isOwner, listingController.deleteListing); //delete

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.editListing);

module.exports = router;
