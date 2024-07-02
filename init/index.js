const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings");

// Conncting Mongodb database  with mongoose
const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(mongoUrl);
}
// Calling main function
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj) => ({ ...obj, owner: "667f8c986b2363ade39157ce" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();
