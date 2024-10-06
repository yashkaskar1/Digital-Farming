import express from 'express';
import { getmyProfile, login, logout, register } from '../controller/user.controller.js';
import { isauthenticated } from '../middleware/authUser.js';
const router = express.Router()
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isauthenticated,logout);
router.get("/my-profile",isauthenticated,getmyProfile);
export default router;