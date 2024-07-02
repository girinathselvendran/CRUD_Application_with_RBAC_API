require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const connectDB = require("./config/database");
const usersRouts = require("./routes/api/usersRouts");
const customerRoutes = require("./routes/api/customerRoutes");

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://crud-application-with-rbac-ui.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", usersRouts);
app.use("/api/customers", customerRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
