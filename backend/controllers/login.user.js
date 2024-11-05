import ModelUser from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userLogged = await ModelUser.findOne({ email });
    
    if (!userLogged) {
      return res.status(401).json({ msg: "User not found" });
    }

    const AuthPassword = await bcrypt.compare(password, userLogged.password);
    
    if (!AuthPassword) {
      return res.status(401).json({ msg: "The password is incorrect" });
    }

    const token = jwt.sign(
      { id: userLogged._id }, 
      process.env.SECRET_KEY, 
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.SECRET_KEY, 
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      
      
        name: userLogged.name,
        username: userLogged.username,
        email: userLogged.email,
        image: userLogged.image,
      
    });
  } catch (error) {
    res.status(500).json({ msg: "A problem occurred in the login session" });
  }
};

export default LoginUser;