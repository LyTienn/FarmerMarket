import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './ProductDetail.css';

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [selectedType, setSelectedType] = useState("1kg");
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/auth/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    if(!product) return <div>Đang tải...</div>;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
        try {
            const res = await fetch('http://localhost:3000/auth/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity,
                    type: selectedType
                })
            });
            if (res.ok) {
                alert(`Đã thêm ${product.name} vào giỏ hàng!`);
                window.dispatchEvent(new Event('cart-updated'));
            } else {
                const data = await res.json();
                alert(data.message || "Thêm vào giỏ hàng thất bại!");
            }
        } catch (error) {
            alert("Lỗi thêm vào giỏ hàng !");
        }
    };

    return (
    <div className="productDetail">
        <div className="productDetail-img-section">
            <div className="back-btn-row">
                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >← Quay lại</button>
            </div>
            <div className="productDetail-img-wrapper">
                <img src={product.image} alt={product.name} className="productDetail-img"/>
            </div>
        </div>
        <div className="productDetail-info">
            <span className="productDetail-name">{product.name}</span>
            <div className="productDetail-desc">{product.description}</div>
            <div className="productDetail-price">{product.price} VNĐ</div>
            <div className ="productDetail-option">
                <span>Chọn loại:</span>
                <button
                    className={selectedType === "1kg" ? "type-btn active" : "type-btn"}
                    onClick={() => setSelectedType("1kg")}
                >1Kg</button>
                <button
                    className={selectedType === "0.5kg" ? "type-btn active" : "type-btn"}
                    onClick={() => setSelectedType("0.5kg")}
                >0.5Kg</button>
            </div>
            <div className="productDetail-option">
                <span>Số lượng:</span>
                <button
                    className="qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >-</button>
                <span className="qty-number">{quantity}</span>
                <button
                    className="qty-btn"
                    onClick={() => setQuantity(q => q + 1)}
                >+</button>
            </div>
            <button
                className="addtocart-button"
                onClick={handleAddToCart}
            >Thêm vào giỏ hàng</button>
        </div>
    </div>
);
};

export default ProductDetail;