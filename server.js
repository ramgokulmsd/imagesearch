const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const dotenv =require("dotenv").config();
const path =require('path');


// Location of the user schema 
// this schema contains the users information
const users = require("./routes/api/users");

const app = express();

//body parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,useUnifiedTopology: true  }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware for authencation
app.use(passport.initialize());

// Passport config to maintaince the authencation datas
require("./config/passport")(passport);

//  user Routes
app.use("/api/users", users);
 
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

 //Create port and listen
const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
