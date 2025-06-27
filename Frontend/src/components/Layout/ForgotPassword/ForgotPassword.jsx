import React, { useState }  from 'react';
import './ForgotPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import logo from '../../../assets/farmer-logo.jpg';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await fetch('http://localhost:3000/auth/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    newPassword: newPassword,
                    rePassword: rePassword,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message || 'Đổi mật khẩu thành công');
                navigate('/login');
            } else {
                const data = await res.json();
                alert(data.message || "Đổi mật khẩu thất bại!");
            }
        } catch (error) {
            alert("ERRORS " + error.message);
            console.error("Error during registration:", error);
        }      
    };

    return (
        <div className='forgotpw-container'>
            <div className='forgotpw-box'>
                <form onSubmit={handleSubmit}>
                    <h1>Quên mật khẩu</h1>
                    <img className='logo-icon' src={logo} alt='farmer-logo' />
                    <div className='forgotpw-input-box'>
                        <input
                        type='text'
                        placeholder='Tên tài khoản'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        />
                        <FaUser className='icon' />
                        {error.username && <div className='error'>{error.username}</div>}
                    </div>
                    <div className='forgotpw-input-box'>
                        <input
                        type='password'
                        placeholder='Mật khẩu mới'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        />
                        <FaLock className='icon' />
                        {error.newPassword && <div className='error'>{error.newPassword}</div>}
                    </div>
                    <div className='forgotpw-input-box'>
                        <input
                        type='password'
                        placeholder='Xác nhận mật khẩu mới'
                        value={rePassword}
                        onChange={e => setRePassword(e.target.value)}
                        required
                        />
                        <FaLock className='icon' />
                        {error.rePassword && <div className='error'>{error.rePassword}</div>}
                    </div>
                    <button type = "submit" className='forgotpass-btn'>Xác nhận</button>
                    <div className='login-link'>
                        <p>Quay lại trang <Link to="/login">Đăng nhập</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;