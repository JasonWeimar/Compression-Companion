// Import necessary modules
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dbConnect from './config/mongoose.config.js';
import SetupRouter from './routes/setup.routes.js';
import UserRouter from './routes/user.routes.js';


// Connect to database
dbConnect();

// Create instance of Express application
const app = express();
const port = 8000;

// Load environment variables from .env file
dotenv.config();

// Use CORS middleware to enable cross-origin requests
app.use(cors({"credentials": true, "origin": "http://localhost:5173"}));
// attach middleware to the express instance
app.use(cookieParser());

// Parse JSON requests
app.use(express.json());



// Use the router middleware for handling API routes undr /api prefix -- ** beltExamRouter will need to be renamed accordingly ** --
app.use("/api", UserRouter);
app.use("/api", SetupRouter);

//Start server and listen on specified port from environment variables
app.listen(port, () => {console.log(`Listening on port: ${port}`)});