require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./db/dbconnection');
// Import routes here...
const hisreq = require("./routes/admin/hisreq");
const sendres = require("./routes/admin/sendres");
const adduser = require("./routes/admin/adduser");
const addcat = require("./routes/admin/addcat");
const addmed = require("./routes/admin/addmed");
const auth = require("./routes/auth");
const filter = require("./routes/user/filter");
const sendreq = require("./routes/user/sendreq");
const session = require('express-session')


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create session 
app.use (session(
  {
    secret:'yOur to-do-app sessions',
    cookie: {maxAge:24*60*60*1000},
    resave: true,
    saveUninitialized: true
  }
));
// Connect to MongoDB
connectToMongoDB();

// Define routes
app.use("/sendres", sendres);
app.use("/request", sendreq);
app.use("/auth", auth);
app.use("/cat", addcat);
app.use("/med", addmed);
app.use("/filter", filter);
app.use("/user", adduser);
app.use("/hisreq", hisreq);
app.use("/sendreq", sendreq);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
