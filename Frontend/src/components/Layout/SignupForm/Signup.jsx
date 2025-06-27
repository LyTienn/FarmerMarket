import React, { useState }  from 'react';
import './Signup.css';
import logo from '../../../assets/farmer-logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setrepassword] = useState('');
    const [error, setError] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        let newError = {};
        setError(newError);
        if (Object.keys(newError).length === 0) {
            setLoading(true);
            try {
            const res = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    repassword,
                })
            });
            if (res.ok) {
                alert('Đăng ký thành công!');
                navigate('/login');
            } else {
                const data = await res.json();
                alert(data.message || "Đăng ký thất bại!");
            } 
            } catch (error) {
                alert("ERRORS " + error.message);
                console.error("Error during registration:", error);
            }
            setLoading(false);
        }
    };
    
    return (
        <div className='signup-container'>
           <div className='signup-box'>
            <form onSubmit={handleSubmit}>
                <h1>Đăng ký</h1>
                <img className='logo-icon' src={logo} alt='farmer-logo' />
                <div className='signup-input-box'>
                  <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                   />
                   <MdEmail className='icon' />
                   {error.email && <div className='error'>{error.email}</div>}
                </div>
                <div className='signup-input-box'>
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
                <div className='signup-input-box'>
                  <input
                    type='password'
                    placeholder='Mật khẩu'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                   />
                   <FaLock className='icon' />
                   {error.password && <div className='error'>{error.password}</div>}     
                </div>
                <div className='signup-input-box'>
                  <input
                    type='password'
                    placeholder='Xác nhận mật khẩu'
                    value={repassword}
                    onChange={e => setrepassword(e.target.value)}
                    required
                   />
                   <FaLock className='icon' />
                   {error.repassword && <div className='error'>{error.repassword}</div>}     
                </div>
                <button type='submit'>Đăng ký</button>
                <div className='login-link'>
                    <p>Đã có tài khoản ? <Link to ='/login'>Login</Link></p>
                </div> 
            </form> 
           </div>
        </div>
    );
}

export default Signup;