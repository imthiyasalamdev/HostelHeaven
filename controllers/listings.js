const { type } = require("os");
const Listing = require("../models/listings");

// Index
module.exports.index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("./listings/index.ejs", { allListings });
};
// New
module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};
// Show
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error:", "no listing available");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("./listings/show", { listing });
};
// Create
module.exports.createNewListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.Listing);
  newListing.owner = req.user._id;
  newListing.image = {url,filename};
  await newListing.save();
  req.flash("success", "successfully added new list"); //flash msg
  res.redirect("/listings");
};
// Edit
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error:", "no listing available");
    res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  originalImage.replace("/upload","/upload/w_250,h_200");
  res.render("./listings/edit.ejs", { listing ,originalImage});
};
// Update
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};


//   Delete
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted");
  console.log(deletedListing);
  res.redirect("/listings");
};
