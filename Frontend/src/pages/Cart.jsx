import { React, useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        //Lấy giỏ hàng từ localStorage hoặc API backend
        const fetchCart = async () => {
            const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
            const res = await fetch('http://localhost:3000/auth/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok && data.items) {
                setCart(data.items);
                const sum = data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
                setTotal(sum);
            } else {
                setCart([]);
                setTotal(0);
            }
        };
        fetchCart();
    }, []);

    const handleCheckout = () => {
        //Thêm API/navigate vào đây
        alert("Thanh toán ...");
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
        await fetch('http://localhost:3000/auth/updateCart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity: newQuantity })
        });
        // Sau khi cập nhật, fetch lại giỏ hàng
        const res = await fetch('http://localhost:3000/auth/cart', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.items) {
            setCart(data.items);
            const sum = data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            setTotal(sum);
        }
    };

    const handleClearCart = async () => {
        //API clearCart
        //fetch lại cart

    }

    return (
        <div className = "cart-container">
            <div className = "cart-content">
                {cart.length === 0 ? (
                    <div>Giỏ hàng rỗng</div>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {cart.map(item => (
                            <li key = {item.product._id} style = {{
                                display: "flex",
                                alignItems: "center",
                                // marginBottom: 18,
                                // background: "#fff",
                                borderBottom: "2px solid #eee",
                                // boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                                padding: 12,
                                position: "relative"
                            }}>
                                <img src={item.product.image} alt={item.product.name} style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", marginRight: 20 }} />
                                <div style={{flex: 1}}>
                                    <div style={{ fontWeight: 600, textAlign: "left" }}>{item.product.name}</div>
                                    <div style={{ textAlign: "left" }}>Số lượng: {item.quantity}</div>
                                    <div style={{ textAlign: "left" }}>Đơn giá: {item.product.price.toLocaleString()}VNĐ</div>
                                </div>
                                <div style={{ fontWeight: 700, color: "#10cc6b", textAlign: "center", minWidth: 110, marginLeft: 20 }}>
                                    {(item.product.price * item.quantity).toLocaleString()} VNĐ
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <button
                                        style={{
                                            width: 28, height: 28, borderRadius: 4, border: "1px solid #ccc",
                                            background: "#fff", fontWeight: 700, fontSize: 18, cursor: "pointer"
                                        }}
                                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600 }}>{item.quantity}</span>
                                    <button
                                        style={{
                                            width: 28, height: 28, borderRadius: 4, border: "1px solid #ccc",
                                            background: "#fff", fontWeight: 700, fontSize: 18, cursor: "pointer"
                                        }}
                                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                                    >+</button>
                                    <button
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#e53935",
                                            fontSize: 22,
                                            marginLeft: 12,
                                            cursor: "pointer"
                                        }}
                                        title="Xóa sản phẩm"
                                        onClick={() => handleUpdateQuantity(item.product._id, 0)}
                                    >&#10005;</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 10,
            // boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            padding: 24,
            minWidth: 260
        }}>
            <h3>Tổng cộng</h3>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#10cc6b", margin: "18px 0" }}>
                {total.toLocaleString()} VNĐ
            </div>
            <button
                style={{
                    width: "100%",
                    padding: "12px 0",
                    background: "#10cc6b",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 18,
                    cursor: "pointer"
                }}
                onClick={handleCheckout}
                disabled={cart.length === 0}
            >
                Thanh toán
            </button>
            <button className="clearCart-btn">
                Xoá giỏ hàng
            </button>
        </div>
    </div>
    )
}

export default Cart;