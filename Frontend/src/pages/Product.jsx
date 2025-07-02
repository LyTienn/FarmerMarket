import { React, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import './Product.css';

const Product = ( {selectedCategory, setSelectedCategory} ) => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        fetch('http://localhost:3000/auth/product')
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);

    // Lấy category từ query string
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) setSelectedCategory(cat);
    }, [location.search, setSelectedCategory]);

    const filteredProduct = selectedCategory === 'all'
        ? product
        : product.filter(item => item.category === selectedCategory);

    const handleAddToCart = async (product) => {
    const token = localStorage.getItem('jwt');
    try {
        const res = await fetch('http://localhost:3000/auth/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: product._id,
                quantity: 1
            })
        });
        if (res.ok) {
            alert(`Đã thêm ${product.name} vào giỏ hàng!`);
            window.dispatchEvent(new Event('cart-updated'));
        } else {
            const data = await res.json();
            alert(data.message || 'Thêm vào giỏ hàng thất bại!');
        }
    } catch (error) {
        alert('Lỗi khi thêm vào giỏ hàng!');
    }
};

    return (
        <div className="product-container">
            <SideBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}/>
            <div className="product-list">
                {filteredProduct.map(product => (
                    <div key={product._id} className="product-item"
                        onClick={e => {
                            if(e.target.classList.contains('addtocart-btn')) return;
                            navigate(`/product/${product._id}`);
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={product.image} alt={product.name} className="product-img"/>
                        <h3>{product.name}</h3>
                        {/* <p>{product.description}</p> */}
                        <b>{product.price} VNĐ</b>
                        <button
                            className="addtocart-btn"
                            onClick={e  => {
                                e.stopPropagation();
                                handleAddToCart(product);
                            }}
                        >Thêm vào giỏ hàng</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product;