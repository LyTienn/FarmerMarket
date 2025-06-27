import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import dotenv from "dotenv";

const app = express();
dotenv.config();
console.log('CLOUDINARY_NAME:', process.env.CLOUDINARY_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);
const PORT = process.env.PORT || 3000; 
const dburl = "mongodb://localhost:27017/";

//Middlewares
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);

mongoose.connect(dburl)
  .then(() => console.log('Connected to DB successfully'))
  .catch((error) => console.log(error.message));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
