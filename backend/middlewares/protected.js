import jwt from "jsonwebtoken";
import ModelUser from "../models/user.model.js";

const Protection = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      msg: "Token not found, user is not authorized"
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userLogged = await ModelUser.findById(decodedToken.id).select('-password');
    
    if (!userLogged) {
      return res.status(401).json({
        msg: "User not found"
      });
    }
    
    req.userLogged = userLogged;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "A problem occurred in the server"
    });
  }
};

export default Protection;