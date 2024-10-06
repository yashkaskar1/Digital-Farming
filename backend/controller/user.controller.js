import { User } from "../models/user model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";
import createTokenandSaveCookies from "../jwt/authToken.js"

export const register = async (req, res) => {
   try {
      if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).json({ message: "NO photo is required" });
      }
      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png"];
      if (!allowedFormats.includes(photo.mimetype)) {
         return res.status(400).json({ message: "invalid photo format. Only jpeg and png are alloweed" });
      }
      const { name, email, phone, education, role, password } = req.body;
      if (!name || !email || !phone  || !education || !role || !password || !photo) {
         return res.status(400).json({ message: "Please fill required fields" });
      }
      const user = await User.findOne({ name })
      if (user) {
         return res.status(400).json({ message: "user already exists with this name" });
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(
         photo.tempFilePath
      )
      if (!cloudinaryResponse || cloudinaryResponse.error) {
         console.log(cloudinaryResponse.error)
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
         name,
         email,
         phone,
         education,
         role,
         password: hashedPassword,
         photo: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
         },
      });
      await newUser.save()
      if (newUser) {
         const token = await createTokenandSaveCookies(newUser._id, res)
         res.status(201).json({ message: "User registered successfully", newUser, token: token });
      }
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "interal server error" });
   }
};

export const login = async (req, res) => {
   const { email, password, role } = req.body;
   try {
      if (!email || !password || !role) {
         return res.status(400).json({ message: "Please fill required fields" });
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user.password) {
         return res.status(400).json({ message: " user password is missing" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!user || !isMatch) {
         return res.status(400).json({ message: "Invalid email or password" });
      }
      if (user.role !== role) {
         return res.status(400).json({ message: `Given role ${role} not found` });
      }
      const token = await createTokenandSaveCookies(user._id, res);
      res.status(200).json({
         message: "user logged in succesfully", user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
         }, token: token
      });
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "interal server error" });
   }
};

export const logout = (req, res) => {
   try {
      res.clearCookie("jwt");
      res.status(200).json({ message: "User logged out successfully" });
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "interal server error" });
   }
};


export const getmyProfile=async(req,res) => {
   const user=await req.user;
   res.status(200).json(user);
};