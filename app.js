if(process.env.NODE_ENV != "production"){
  require('dotenv').config();

}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { data } = require("./init/data.js");
const { nextTick } = require("process");
const ExpressError = require("./utils/ExpressError.js");
// Routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Session & Flash
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
// Passport Authentication
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const { error } = require('console');


// Deployment
const dbUrl = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

// At cloud  mongo session 
const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET_VALUE,
  },
  touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("Error in mongo session",err)
})

// Session Middleware
const sessionOptions = {
  store,
  secret:process.env.SECRET_VALUE,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


// Usages of npms
app.use(session(sessionOptions));
app.use(flash());

// Passport use
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Define  Middleware for Flash Message
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; //storing user info in a var
  next();
});


// Connecting MongoDB database with mongoose
// const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";


// View Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public")));

app.use(express.static('public'));

// Roters Use
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});
// Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // let {statusCode,message} = err;
  // res.status(statusCode).send(message);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
