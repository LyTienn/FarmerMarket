import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

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

    const handleNavigateDashBoard = () => {
        navigate('/dashboard');
    }

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
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
        await fetch('http://localhost:3000/auth/deleteCart', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Sau khi xóa, fetch lại giỏ hàng
        const res = await fetch('http://localhost:3000/auth/cart', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.items) {
            setCart(data.items);
            setTotal(0);
        }
    }

    return (
        <div className = "cart-container">
            <div className = "cart-content">
                {cart.length === 0 ? (
                    <div className='cart-empty'>
                    <p>Giỏ hàng rỗng</p>
                    <button className='back-button' onClick={handleNavigateDashBoard}>Quay lại trang chủ</button>
                    </div>
                ) : (
                <>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {cart.map(item => (
                            <li key = {item.product._id} style = {{
                                display: "flex",
                                alignItems: "center",
                                borderBottom: "2px solid #eee",
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
                    <button className='clearCart-btn'
                    onClick={handleClearCart}>
                        Xóa giỏ hàng
                    </button>
                </> 
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
            <button className='purchase-btn'
                onClick={handleCheckout}
                disabled={cart.length === 0}
            >
                Thanh toán
            </button>
        </div>
    </div>
    )
}

export default Cart;