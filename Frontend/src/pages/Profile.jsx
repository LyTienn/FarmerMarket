import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import userIcon from '../assets/user_icon.svg'; // Assuming you have a default user icon


const Profile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(() => {
        const u = localStorage.getItem('user');
        return u ? JSON.parse(u) : {};
    });
    const [avatar, setAvatar] = useState(userInfo.avatar || '');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef();
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    // State kiểm soát trường nào đang sửa
    const [edit, setEdit] = useState({
        fullname: false,
        phone: false,
        birthdate: false,
        gender: false,
        address: false,
    });

    // State tạm cho các trường chỉnh sửa
    const [editValues, setEditValues] = useState({
        fullname: userInfo.fullname || '',
        phone: userInfo.phone || '',
        birthdate: userInfo.birthdate ? userInfo.birthdate.slice(0,10) : '',
        gender: userInfo.gender || '',
        address: userInfo.address || '',
    });

    const handleEdit = (field) => {
        setEdit({ ...edit, [field]: true });
    };

    const handleInputChange = (field, value) => {
        setEditValues({ ...editValues, [field]: value });
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if(!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);
        const token = localStorage.getItem('jwt');
        try {
            const res =  await fetch('http://localhost:3000/auth/upload-avatar', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
            const data = await res.json();
            if(data.avatar) {
                setAvatar(data.avatar);
                const updatedUser = { ...userInfo, avatar: data.avatar };
                setUserInfo(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                alert('Cập nhật ảnh đại diện thành công');
            } else {
                alert('Cập nhật ảnh đại diện thất bại', error.message);
            }
        } catch (error) {
            alert('Lỗi khi cập nhật ảnh đại diện: ' + error.message);
        }
        setUploading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const token = localStorage.getItem('jwt');
        try {
            const res = await fetch('http://localhost:3000/auth/user-info', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullname: editValues.fullname,
                    phone: editValues.phone,
                    birthdate: editValues.birthdate,
                    gender: editValues.gender,
                    address: editValues.address,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                const oldUser = JSON.parse(localStorage.getItem('user'));
                const newUser = { ...oldUser, ...data}; //merge
                setUserInfo(newUser);
                localStorage.setItem('user', JSON.stringify(newUser));
                alert('Cập nhật thông tin thành công');
                setEdit({
                    fullname: false,
                    phone: false,
                    birthdate: false,
                    gender: false,
                    address: false,
                });
            } else {
                alert('Cập nhật thông tin thất bại: ' + data.message);
            }
        } catch (error) {
            alert('Lỗi khi cập nhật thông tin: ' + error.message);
        }
        setSaving(false);
    };

    return (
        <div className='profile-container'>
            <button 
                className='back-btn'
                onClick={() => navigate(-1)}
            >← Quay lại</button>
            <div className='profile-title'>
                <h1>Thông tin tài khoản</h1>
                <img src= {avatar || userIcon}
                     alt= "avatar"
                     className="avatar"
                />
            <input 
                type = "file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
            />
            <button
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
            >
                {uploading ? 'Đang tải lên...' : 'Chọn ảnh'}
            </button>
            </div>
            <div className='profile-info'>
                <div><b>Tên đăng nhập:</b> {userInfo.username}</div>
                <div>
                    <b>Họ tên:</b>
                    {edit.fullname ? (
                        <input
                            type="text"
                            value={editValues.fullname}
                            onChange={e => handleInputChange('fullname', e.target.value)}
                            style={{ marginLeft: 10, width: 200 }}
                        />
                    ) : (
                        <>
                            <span style={{ marginLeft: 10 }}>{userInfo.fullname}</span>
                            <button className="edit-btn" onClick={() => handleEdit('fullname')}>Thay đổi</button>
                        </>
                    )}
                </div>
                <div>
                    <b>Số điện thoại:</b>
                    {edit.phone ? (
                        <input
                            type="text"
                            value={editValues.phone}
                            onChange={e => handleInputChange('phone', e.target.value)}
                            style={{ marginLeft: 10, width: 200 }}
                        />
                    ) : (
                        <>
                            <span style={{ marginLeft: 10 }}>{userInfo.phone}</span>
                            <button className="edit-btn" onClick={() => handleEdit('phone')}>Thay đổi</button>
                        </>
                    )}
                </div>
                <div>
                    <b>Ngày sinh:</b>
                    {edit.birthdate ? (
                        <input
                            type="date"
                            value={editValues.birthdate}
                            onChange={e => handleInputChange('birthdate', e.target.value)}
                            style={{ marginLeft: 10 }}
                        />
                    ) : (
                        <>
                            <span style={{ marginLeft: 10 }}>
                                {userInfo.birthdate ? new Date(userInfo.birthdate).toLocaleDateString() : ''}
                            </span>
                            <button className="edit-btn" onClick={() => handleEdit('birthdate')}>Thay đổi</button>
                        </>
                    )}
                </div>
                <div>
                    <b>Giới tính:</b>
                    {edit.gender ? (
                        <select
                            value={editValues.gender}
                            onChange={e => handleInputChange('gender', e.target.value)}
                            style={{ marginLeft: 10 }}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nữ">Nữ</option>
                            <option value="khác">Khác</option>
                        </select>
                    ) : (
                        <>
                            <span style={{ marginLeft: 10 }}>{userInfo.gender}</span>
                            <button className="edit-btn" onClick={() => handleEdit('gender')}>Thay đổi</button>
                        </>
                    )}
                </div>
                <div>
                    <b>Địa chỉ:</b>
                    {edit.address ? (
                        <input
                            type="text"
                            value={editValues.address}
                            onChange={e => handleInputChange('address', e.target.value)}
                            style={{ marginLeft: 10, width: 200 }}
                        />
                    ) : (
                        <>
                            <span style={{ marginLeft: 10 }}>{userInfo.address}</span>
                            <button className="edit-btn" onClick={() => handleEdit('address')}>Thay đổi</button>
                        </>
                    )}
                </div>
                <div><b>Email:</b> {userInfo.email}</div>
                <div><b>Vai trò:</b> {userInfo.role}</div>
                <button
                className="profile-save-btn"
                onClick={handleSave}
                disabled={saving}
                style={{
                    marginTop: 24,
                    padding: '10px 32px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#10cc6b',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer'
                }}
            >
                {saving ? 'Đang lưu...' : 'Lưu'}
            </button>
            </div>
        </div>
    );
};

export default Profile;