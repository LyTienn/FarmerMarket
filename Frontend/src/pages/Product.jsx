import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import './Product.css';

const Product = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/auth/product')
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);


    return (
        <div className="product-container">
            <SideBar/>
            <div className="product-list">
                {product.map(product => (
                    <div key={product._id} className="product-item">
                        <img src={product.image} alt={product.name} className="product-img"/>
                        <h3>{product.name}</h3>
                        {/* <p>{product.description}</p> */}
                        <b>{product.price} VNĐ</b>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product;