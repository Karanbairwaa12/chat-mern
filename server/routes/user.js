import express from "express";
import User from "../modules/userModule.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { verify, verifyTokenAndAuthorization } from "../verifyToken.js";
const router = express.Router()
router.get('/',verify,async (req,res)=> {
  const searchQuery = req.query.name;

  if (!searchQuery) {
    return res.status(400).json({ message: "Name query parameter is missing" });
  }

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: new RegExp(searchQuery, 'i') } },
        { email: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    });

    if (users.length === 0) {
      return res.json({ message: "No matching users found." });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})

export default router 