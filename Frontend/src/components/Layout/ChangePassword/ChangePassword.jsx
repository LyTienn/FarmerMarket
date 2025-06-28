import { react, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import logo from '../../../assets/farmer-logo.jpg';
import './ChangePassword.css';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
            console.log('Token gửi lên:', token);
            const res = await fetch('http://localhost:3000/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmPassword
                })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Đổi mật khẩu thành công!');
                navigate('/profile');
            } else {
                alert(data.message || "Đổi mật khẩu thất bại!");
            }
        } catch (error) {
            alert("ERRORS " + error.message);
            console.error("Error during registration:", error);
        }
    }
    return (
        <div className="forgotpw-container">
            <div className="forgotpw-box">
                <form onSubmit={handleSubmit}>
                    <h1>Đổi mật khẩu</h1>
                    <img className='logo-icon' src={logo} alt='farmer-logo' />
                    {/* <div className='forgotpw-input-box'>
                        <input
                            type='text'
                            placeholder='Tên tài khoản'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            equired
                        />
                        <FaUser className='icon' />
                        {error.username && <div className='error'>{error.username}</div>}
                    </div> */}
                    <div className='forgotpw-input-box'>
                        <input
                            type='password'
                            placeholder='Mật khẩu hiện tại'
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            required
                        />
                        <FaLock className='icon' />
                        {error.currentPassword && <div className='error'>{error.currentPassword}</div>}
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
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                        <FaLock className='icon' />
                        {error.confirmPassword && <div className='error'>{error.confirmPassword}</div>}
                    </div>
                    <button type = "submit" className='forgotpass-btn'>Xác nhận</button>
                    <div className='login-link'>
                        <p>Quay lại trang <Link to="/login">Đăng nhập</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ChangePassword;