import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/farmer-logo.jpg';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('rememberMe'));
        if (saved) {
        setUsername(saved.username);
        setPassword(saved.password);
        setRemember(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                }
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                if (remember) {
                    localStorage.setItem('rememberMe', JSON.stringify({ username, password}));
                } else {
                    localStorage.removeItem('rememberMe');
                }
                alert("Đăng nhập thành công!");
                window.location.href = '/dashboard';
            } else {
                const data = await res.json();
                alert(data.message || "Đăng nhập thất bại!");
            }
        } catch (error) {
            alert("ERRORS " + error.message);
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Đăng nhập
                    <img className="logo-icon" src={logo} alt="farmer-logo"/>
                </h1>
                <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input 
                        type="text"
                        placeholder="Tên tài khoản"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon"/>
                </div>
                {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                <div className="remember">
                    <label>
                        <input type="checkbox"
                            checked={remember}
                            onChange={e => setRemember(e.target.checked)}
                        />
                        Ghi nhớ
                    </label>
                    <Link to="/forgot-password">Quên mật khẩu ?</Link>
                </div>
                <button type="submit">Đăng nhập</button>
                <div className="register-link">
                    <p>Chưa có tài khoản ? <Link to="/signup">Đăng ký</Link></p>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Login;