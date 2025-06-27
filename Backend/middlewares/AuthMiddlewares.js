import jwt from "jsonwebtoken";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
export default upload;

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token." });

    req.user = decoded; 
    next();
  });
};