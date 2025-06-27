import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import './Header.css';
import logo from '../../assets/farmer-logo.jpg';
import cartlogo from '../../assets/Cart_Logo.svg';
import search from '../../assets/search_icon.svg';
import user_icon from '../../assets/user_icon.svg';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        const user = localStorage.getItem('user');
        if (token && user) {
            setIsLoggedIn(true);
            setUserInfo(JSON.parse(user));
        } else {
            setIsLoggedIn(false);
            setUserInfo(null);
        }
    }, []);

    console.log('Header render - isLoggedIn:', isLoggedIn, 'userInfo:', userInfo);
     
    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    }

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            alert("Lỗi" + error.message);
            console.error("Đăng xuất thất bại:", error);
        }
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        setIsLoggedIn(false);
        setUserInfo(null);
        setShowDropdown(false);
        navigate('/dashboard');
    };

    const handleViewProfile = () => {
        navigate('/profile');
    }

    const handleNavigateDashboard = () => {
        navigate('/');
        window.location.reload();
    };


    return (
        <header className='header-container' style={{ backgroundColor: isScrolled ? '#fff' : 'transparent' }}>
            <div className='header-title' onClick={handleNavigateDashboard}>
                <h2>TFarmer</h2>
            </div>
            <div className='header-logo' onClick={handleNavigateDashboard}>
                <img src={logo} alt="TFarmer Logo" className='logo-icon' />
            </div>
            { !isLoggedIn ? (
                <>
                    <button className='log-button' onClick={handleLogin}>Đăng nhập</button>
                    <button className='log-button' onClick={handleSignup}>Đăng ký</button>
                </>
            ) : (
                <div className='user-menu' style={{ position: 'relative', display: 'flex'}}>
                    <img
                        src={userInfo?.avatar && userInfo.avatar !== '' ? userInfo.avatar : user_icon}
                        alt='User icon'
                        className='user-icon'
                        style={{ cursor: 'pointer', width: 30, height: 30, marginRight: 15 }}
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className='dropdown-menu' style={{
                            position: 'absolute',
                            top:'45px',
                            right: 0,
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: 6,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            minWidth: 180,
                            zIndex: 100
                        }}>
                            <div style={{ padding: 12 }}>
                                <div><b>{userInfo?.username || 'user'}</b></div>
                                <hr style={{ margin: '10px 0' }} />
                                <button className='view-profile-button' onClick={handleViewProfile}>
                                    <img
                                        src={user_icon}
                                        alt="User Icon"
                                        style={{ width: 16, height: 16, borderRadius:'50%', marginRight: 4, verticalAlign: 'middle'}}
                                    /><span style={{ flex: 1, textAlign: 'center' }}>Tài khoản</span></button>
                                <button className='logout-button' onClick={handleLogout}>
                                    <FiLogOut style={{ width: 16, height: 16, marginRight: 4, verticalAlign: 'middle' }}
                                    /><span style={{ flex: 1, textAlign: 'center' }}>Đăng xuất</span></button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className='header-search'>
                <input 
                    type='search' 
                    placeholder="Tìm kiếm..."
                    className='search-input'
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <img src={search} alt = 'search icon' className='search-icon'/>
            </div>
            <div className='header-cart'>
                <img src={cartlogo} alt='Cart Logo' className='cart-icon' /*onClick={handleNavigateCart}*//>
                Giỏ hàng (0)
            </div>
        </header>
    )
}

export default Header;
