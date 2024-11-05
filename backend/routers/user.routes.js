import express from "express";
import CreateUser from "../controllers/create.user.js";
import LoginUser from "../controllers/login.user.js";
import Protection from "../middlewares/protected.js";
import checkAuth from "../controllers/isAutenticated.user.js";

const RouterUser = express.Router();

RouterUser.post("/create-user", CreateUser);
RouterUser.post("/login", LoginUser);
RouterUser.get('/checkauth', checkAuth);

RouterUser.get('/protected-route', Protection, (req, res) => {
  res.json({ msg: "This is a protected route", user: req.userLogged });
}); 

RouterUser.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    return res.status(200).json({ message: 'Logout exitoso' });
  });
  

export default RouterUser;