import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import userRoute from "./routes/user.route.js";
import agrishareRoute from "./routes/agrishare.routes.js";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT;
const MONOGO_URL = process.env.MONOG_URI;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET","POST", "PUT", "DELETE","PATCH"],
    credentials:true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//db code
try {
  mongoose.connect(MONOGO_URL);
  console.log("connected to monogodb");
} catch (error) {
  console.log(error);
}

//defining routes
app.use("/api/users", userRoute);
app.use("/api/agrishare", agrishareRoute);

//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});