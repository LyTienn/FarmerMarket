import Cart from '../models/CartModels.js';

export const getCart = async (req, res) => {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    res.json(cart || { user: userId, items: []});
};

export const addToCart = async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user:userId });
    if (!cart) {
        cart = new Cart({ user:userId, items: [] });
    }
    const item = cart.items.find(i => i.product.toString() === productId);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.json(cart);
};

export const updateCartItem = async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    const item = cart.items.find(i => i.product.toString() === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            cart.items = cart.items.filter(i => i.product.toString() !== productId);
        }
        await cart.save();
        res.json(cart);
    } else {
        res.status(404).json({ message: "Giỏ hàng rỗng" });
    }
};

export const clearCart = async (req, res) => {
    const userId = req.user.userId;
    await Cart.findOneAndDelete({ user: userId });
    res.json({ message: "Xoá giỏ hàng thành công!" });
};