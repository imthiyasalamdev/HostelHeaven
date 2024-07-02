const mongoose = require("mongoose");
const { type } = require("os");
const Review = require("./review");
const Schema = mongoose.Schema;

// Creating Listing Schema
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    fileName: String,
  },
  price: Number,
  location: String,
  Country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
// Mongoose Middleware
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Creating listing model using Listing schema
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
