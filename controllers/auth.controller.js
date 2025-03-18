import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// What is a req body? -> req.body is an object containing data from the client
// What is a req query? -> req.query is an object containing the query parameters from the client
// What is a req params? -> req.params is an object containing the route parameters from the client

export const signUp = async (req, res, next) => {
  // Implement Sign In logic
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Logic to create a new user
    const {name, email, password} = req.body;
    // Check if a user already exists
    const existingUser = await User.findOne({email});
    if(existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsers = await User.create([{
      name,
      email,
      password: hashedPassword,
    }], {session})
    const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0],
      }
    })
  }
  catch(error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signIn = async (req, res, next) => {
  // Not creating session because not creating any data just accessing
  // Implement Sign In logic
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      }
    })
  }
  catch(error) {
    next(error);
  }
}

export const signOut = async (req, res, next) => {
  // Implement Sign Out logic
}