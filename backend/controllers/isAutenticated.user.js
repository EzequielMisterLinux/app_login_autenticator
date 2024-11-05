import jwt from 'jsonwebtoken';
import ModelUser from "../models/user.model.js";

const checkAuth = async (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await ModelUser.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    
    res.json({ 
      msg: "Authenticated",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        image: user.image,
      }
    });
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

export default checkAuth;