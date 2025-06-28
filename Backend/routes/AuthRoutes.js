import Router from 'express';
import {login, logout, updateUserInfo, register, forgotPassword, changePassword} from '../controllers/AuthController.js';
import {addProfileImage, getUserInfo} from '../controllers/AuthController.js';
import { getAllProducts, getAllCategories, getProductById } from '../controllers/ProductController.js';
import { getCart, addToCart, updateCartItem, clearCart } from '../controllers/CartController.js';
import upload from '../middlewares/AuthMiddlewares.js';
import {verifyToken} from '../middlewares/AuthMiddlewares.js';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.post('/forgotPassword', forgotPassword);
authRoutes.post('/change-password', verifyToken, changePassword);
authRoutes.post('/addToCart', verifyToken, addToCart);
authRoutes.put('/user-info',verifyToken, updateUserInfo);
authRoutes.put('/updateCart', verifyToken, updateCartItem);
authRoutes.get('/user-info2', verifyToken, getUserInfo);
authRoutes.get('/product', getAllProducts);
authRoutes.get('/category', getAllCategories);
authRoutes.get('/product/:id', getProductById);
authRoutes.get('/cart', verifyToken, getCart);
authRoutes.post('/upload-avatar', verifyToken, upload.single('avatar'), addProfileImage);
authRoutes.delete('/deleteCart', verifyToken, clearCart);

export default authRoutes;