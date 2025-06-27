import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import banner from '../assets/banner_logo.jpg';
// import vegetable from '../assets/vegetable_icon2.webp';
import fruit from '../assets/fruit_icon2.png';
// import rice from '../assets/rice_icon.webp';
// import spice from '../assets/spice_icon2.jpg';
import meat from '../assets/meat_icon.webp';
// import seafood from '../assets/seafood_icon.jpg';
// import drink from '../assets/milk_icon.png';
// import sale from '../assets/sale_icon.webp';
// import tea from '../assets/tea_icon.webp';


const fruits = [
    {
        id: 1,
        name: 'Táo',
        image: fruit,
        path: './Dashboard.jsx'
    },
    {
        id: 2,
        name: 'Cam',
        image: fruit,
        path: './Dashboard.jsx'
    },
    {
        id: 3,
        name: 'Chuối',
        image: fruit,
        path: './Dashboard.jsx'
    },
    {
        id: 4,
        name: 'Xoài',
        image: fruit,
        path: './Dashboard.jsx'
    },
    {
        id: 5,
        name: 'Dưa hấu',
        image: fruit,
        path: './Dashboard.jsx'
    },
]

const vegetables = [
    {
        id: 1,
        name: 'Rau muống',
        image: meat,
        path: './Dashboard.jsx'
    },
    {
        id: 1,
        name: 'Khoai tây',
        image: meat,
        path: './Dashboard.jsx'
    },
    {
        id: 1,
        name: 'Cà chua',
        image: meat,
        path: './Dashboard.jsx'
    },
    {
        id: 1,
        name: 'Ngô',
        image: meat,
        path: './Dashboard.jsx'
    },
    {
        id: 1,
        name: 'Rau bắp cải',
        image: meat,
        path: './Dashboard.jsx'
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
                <h2>Hoa quả tươi</h2>
                <div className='hot-grid'>
                    {fruits.map((fruit) => (
                        <div
                            key={fruit.id}
                            className='fruit-item'
                            onClick={() => handleCategoryClick(fruit.path)}
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
                <h2>Rau củ tươi</h2>
                <div className='hot-grid'>
                    {vegetables.map((vegetable) => (
                        <div
                            key={vegetable.id}
                            className='fruit-item'
                            onClick={() => handleCategoryClick(vegetable.path)}
                        >
                            <img
                                src={vegetable.image}
                                alt={vegetable.name}
                                className='fruit-image'
                            />
                            <h3 className='fruit-name'>{vegetable.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;