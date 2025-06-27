import Product from '../models/ProductModels.js';
import Category from '../models/CategoryModels.js';
import jwt from 'jsonwebtoken';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm", error });
    }
};

export const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
};