import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import banner from '../assets/banner_logo.jpg';
import apple from '../assets/apple.png';
import fruit from '../assets/fruit_icon2.png';
import meat from '../assets/meat_icon.webp';
import mango from '../assets/mango.webp';
import milk from '../assets/milk.jpg';
import fish from '../assets/fish.jpg';
import tea from '../assets/tea.webp';


const fruits = [
    {
        id: 1,
        name: 'Hoa quả tây bắc',
        image: apple,
        path: './Dashboard.jsx',
        key: 'fruit'
    },
    {
        id: 2,
        name: 'Sữa bò',
        image: milk,
        path: './Dashboard.jsx',
        key: "milk"
    },
    {
        id: 3,
        name: 'Cá nuôi sông',
        image: fish,
        path: './Dashboard.jsx',
        key: "fish"
    },
    {
        id: 4,
        name: 'Trà thảo dược',
        image: tea,
        path: './Dashboard.jsx',
        key: "tea"
    },
    {
        id: 5,
        name: 'Đặc sản vùng miền',
        image: fruit,
        path: './Dashboard.jsx',
        key: "traditionfood"
    },
]

const Dashboard = ({setSelectedCategory}) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const handleCategoryClick = (path) => {
        navigate(path);
    }

    useEffect(() => {
        fetch('http://localhost:3000/auth/category')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    // const { isAuthenticated } = useAuth();
    return (
        <div className='dashboard-container'>
            <div className='banner'>
                <div className='banner-content'>
                    <h2>Welcome to TFarmer Market</h2>
                </div>
                <img src={banner} alt='banner' className='banner-logo'/> 
            </div>
            <div className='category'>
                <div className='category-header'>
                    <div className='category-title'>
                        <h2>Danh mục</h2>
                    </div>
                    <button className='all-btn'
                    onClick={() => {handleCategoryClick('/product'); setSelectedCategory('all');}}>Tất cả</button>
                </div>
                <div className='category-grid'>
                    {categories.map((categories) => (
                        <div
                            key={categories.id}
                            className='category-item'
                            onClick={() =>{ 
                                navigate(`/product?category=${categories.key}`);
                            }}
                        >
                            <img
                                src={categories.image}
                                alt={categories.name}
                                className='category-image'
                            />
                            <span className='category-name'>{categories.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='hot-search'>
                <h2>Thực phẩm tươi</h2>
                <div className='hot-grid'>
                    {fruits.map((fruit) => (
                        <div
                            key={fruit.id}
                            className='fruit-item'
                            onClick={() => navigate(`/product?category=${fruit.key}`)}
                        >
                            <img
                                src={fruit.image}
                                alt={fruit.name}
                                className='fruit-image'
                            />
                            <h3 className='fruit-name'>{fruit.name}</h3>
                        </div>
                    ))}
                </div> 
            </div>
        </div>
    );
};

export default Dashboard;