import Router from 'express';
import {login, logout, updateUserInfo, register, forgotPassword} from '../controllers/AuthController.js';
import {addProfileImage} from '../controllers/AuthController.js';
import { getAllProducts, getAllCategories } from '../controllers/ProductController.js';
import upload from '../middlewares/AuthMiddlewares.js';
import {verifyToken} from '../middlewares/AuthMiddlewares.js';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.post('/forgotPassword', forgotPassword);
authRoutes.put('/user-info',verifyToken, updateUserInfo);
authRoutes.get('/product', getAllProducts);
authRoutes.get('/category', getAllCategories);
authRoutes.post('/upload-avatar', verifyToken, upload.single('avatar'), addProfileImage);

export default authRoutes;