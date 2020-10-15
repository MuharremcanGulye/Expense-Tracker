const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

const connectDB = require("./config/db");

//Reading Config Values
dotenv.config({path : "./config/config.env"});

//Database Connection 
connectDB();

//Express init
const app = express();

//Body Parser
app.use(express.json());

// Routes for API
const transactions = require("./routes/transactions");

// Setting the url for api
app.use("/api/v1/transactions" , transactions);

if(process.env.NODE_ENV === "development" ){
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))