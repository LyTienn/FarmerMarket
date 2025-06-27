import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import './Product.css';

const Product = ( {selectedCategory, setSelectedCategory} ) => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    // const [selectedCategory, setSelectedCategory] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/auth/product')
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);

    const filteredProduct = selectedCategory === 'all'
        ? product
        : product.filter(item => item.category === selectedCategory);

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
                                //Xử lí thêm vào giỏ tại đây
                                e.stopPropagation();
                                alert(`Đã thêm ${product.name} vào giỏ hàng!`);
                            }}
                        >Thêm vào giỏ hàng</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product;