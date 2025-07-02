import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryInfo.css';

const CartDeliveryInfo = () => {
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        phone: '',
        address: '',
        payment: 'cod' || 'online',
        note: ''
    });
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(-1);
    }
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Lấy tổng tiền từ API giỏ hàng
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
        fetch('http://localhost:3000/auth/cart', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.items) {
                const sum = data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
                setTotal(sum);
            }
        });
    }, []);

    const handleChange = (e) => {
        setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        alert("Đặt hàng thành công!");
    }

    return (
        <div className='deliveryInfo-container'>
            <div className='deliveryInfo-title'>
                <h2>Thông tin đặt hàng</h2>
            </div>
            <div className='deliveryInfo-content'>
                <form onSubmit={handleSubmit} className="deliveryInfo-form">
                <div className="deliveryInfo-row">
                    <label>Họ tên người nhận<span className="required">*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={deliveryInfo.name}
                            onChange={handleChange}
                            required
                            placeholder="Nhập họ tên"
                        />
                </div>
            <div className="deliveryInfo-row">
            <label>Số điện thoại<span className="required">*</span></label>
                <input
                    type="text"
                    name="phone"
                    value={deliveryInfo.phone}
                    onChange={handleChange}
                    required
                    placeholder="Nhập số điện thoại"
                />
            </div>
            <div className="deliveryInfo-row">
                <label>Địa chỉ<span className="required">*</span></label>
                <input
                    type="text"
                    name="address"
                    value={deliveryInfo.address}
                    onChange={handleChange}
                    required
                    placeholder="Nhập số nhà, tên đường"
                />
            </div>
            <div className="deliveryInfo-row">
                <label>Phương thức thanh toán</label>
                <div style={{ display: "flex", gap: 24 }}>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={deliveryInfo.payment === "cod"}
                            onChange={handleChange}
                        />
                        Tiền mặt khi nhận hàng
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="online"
                            checked={deliveryInfo.payment === "online"}
                            onChange={handleChange}
                        />
                        Thanh toán trực tuyến
                    </label>
                </div>
            </div>
            <div className='deliveryInfo-row'>
                <label>Ghi chú (Nếu có)</label>
                <input
                    type="text"
                    name="note"
                    value={deliveryInfo.note}
                    onChange={handleChange}
                />
            </div>
            <div style={{ textAlign: "right", margin: "24px 10px 12px 0", fontWeight: 700, fontSize: 18, color: "#10cc6b" }}>
                Tổng giá trị tiền hàng: {total.toLocaleString()} VNĐ
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
                    <button
                        type="button"
                        className="back-btn"
                        onClick={handleNavigate}
                    >
                        ← Quay lại
                    </button>
                    <button type="submit" className="submit-btn">
                        Xác nhận đặt hàng
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default CartDeliveryInfo;