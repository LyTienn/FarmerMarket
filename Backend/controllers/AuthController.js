import User from '../models/UserModels.js';
import jwt from 'jsonwebtoken';
import {compare} from 'bcrypt';
import { renameSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import cloudinary from '../cloudinary/cloudinary.js';
import fs from 'fs';

const maxAge = 1 * 60 * 60 * 1000;

const createToken = (username, userId) => {
    return jwt.sign({username, userId}, process.env.JWT_KEY, {expiresIn: maxAge});
}

//Đăng ký
export const register = async (req, res) => {
  const {username, email, password, repassword, phone, gender, fullname, address, birthdate} = req.body;
  const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };
    if (!validateEmail(email)){
      return res.status(400).json({message: "Email không hợp lệ"});
    }
    if (!username || !email || !password || !repassword){
      return res.status(400).json({message: 'Tên tài khoản, email và mật khẩu không được để trống'});
    }
    if (password.length < 8) {
      return res.status(400).json({message: 'Mật khẩu phải có ít nhất 8 ký tự'});  
    }
    if (password !== repassword){
      return res.status(400).json({message: 'Mật khẩu không trùng khớp'});
    }
  try{
    const existEmail = await User.findOne({email});
    if (existEmail) {
        return res.status(400).json({message: 'Email đã tồn tại'});
    }
    const existUser = await User.findOne({username});
    if (existUser) {
      return res.status(400).json({message: 'Tên tài khoản đã tồn tại'});
    }
    const newUser = new User({
      username,
      email, 
      password, 
      phone: phone || '',
      fullname: fullname || '',
      birthdate: birthdate || '', 
      gender: gender, 
      address: address || '',
    });
    await newUser.save();
    res.status(201).json({message: 'Đăng ký thành công'});
  } catch (error) {
    res.status(500).json({message: 'Lỗi Sever', error});
  }
};

//Đăng nhập
export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(400).json({message: 'Tên tài khoản và mật khẩu không được để trống'});
    }
    const user = await User.findOne({username});
    if (!user) {
        return res.status(404).json({message: 'Tài khoản không tồn tại'});
    }
    if (password.length < 8) {
      return res.status(400).json({message: 'Mật khẩu phải có ít nhất 8 ký tự'});  
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({message: 'Mật khẩu không đúng'});
    }
    const jwtToken = createToken(username, user._id);
    res.cookie("jwt", jwtToken,{
        httpOnly: true,
        secure: true,
        maxAge,
        sameSite: 'none',
    });
    
    return res.json({
        message: 'Đăng nhập thành công',
        token: jwtToken, 
        user: {
            username: user.username,
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            birthdate: user.birthdate,
            gender: user.gender,
            address: user.address,
            role: user.role,
            avatar: user.avatar,
        }
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server bị lỗi'});
  }
};

//Đăng xuất
export const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt", {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        });
        return res.status(200).json({message: 'Đăng xuất thành công'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server bị lỗi'});
    }
}

//Thông tin user
export const getUserInfo = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(400).json({ message: "User not authenticated." });
  }

  const user = await User.findById(userId);
  res.status(200).json(user);
};

//Cập nhật thông tin user
export const updateUserInfo = async (req, res) => {
  const userId = req.user?.userId;
  console.log(req.user)
  if (!userId) {
    return res.status(400).json({ message: "User not authenticated." });
  }
  const { fullname, phone, address, birthdate, gender } = req.body;
  const user = await User.findByIdAndUpdate({_id: userId}, {
    fullname,
    phone,
    address,
    birthdate,
    gender,
  }, {new: true});
  res.status(200).json(user);
};

//Đổi mật khẩu
export const changePassword = async (req, res) => {
  try { 
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).json({ message: "Người dùng không tồn tại." });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword){
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu mới và xác nhận mật khẩu không khớp." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 8 ký tự." });
    }

    // Tìm user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    // Kiểm tra mật khẩu hiện tại
    const isCurrentPasswordValid = await compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng." });
    }

    user.password = newPassword; // Set mật khẩu mới (chưa hash)
    console.log(user);
    await user.save(); // Middleware pre('save') sẽ tự động hash

    res.status(200).json({ message: "Đổi mật khẩu thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server bị lỗi" });
  }
}

export const forgotPassword = async (req, res) => {
  const {username, newPassword, rePassword } = req.body;
  if (!username || !newPassword || !rePassword) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin"});
  }
  if (newPassword !== rePassword) {
    return res.status(400).json({ message: "Mật khẩu không trùng khớp"});
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 8 ký tự"});
  }
  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ message: "Tên tài khoản không tồn tại"});
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Đổi mật khẩu thành công"});
  } catch (error) {
    res.status(500).json({ message: "Server bị lỗi" });
  }
};

//Cập nhật ảnh đại diện
export const addProfileImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      transformation: [{width: 200, height: 200, crop: 'fill'}]
    });

    //Xóa file tạm sau khi upload lên Cloudinary
    fs.unlinkSync(req.file.path);
    
    const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        {avatar: result.secure_url},
        {new: true, runValidators: true},
    );

    res.json({ avatar: result.secure_url, username: updatedUser.username });
  } catch(error){
    console.log(error);
    res.status(500).json({message: "Upload ảnh thất bại", error});
  }
}
