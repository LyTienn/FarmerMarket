import mongoose from 'mongoose';
import { genSalt, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ", ""],
    default: "",
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user", "buyer", "seller"],
    required: true,
    default: "user",
  },
  avatar: {
    type: String,
  },
});

userSchema.pre('save', async function(next){
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
}, );

const User = mongoose.model("Users", userSchema);

export default User;