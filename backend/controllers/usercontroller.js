import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { admin } from '../middleware/authMiddleware.js';


const handleError = (res, message, status = 500) => res.status(status).json({ error: message });


export const getAllUsers = async (req, res) => {
  try {
    res.json(await User.find());
  } catch {
    handleError(res, 'Failed to fetch users');
  }
};



export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ 
      error: "Validation failed",
      message: "Name, email and password are required",
      statusCode: 400
    });
  }

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Duplicate email",
        message: "Email already registered",
        statusCode: 409
      });
    }

    
    const user = await User.create({ name, email, password });

  
    const userData = user.toObject();
    delete userData.password;

    return res.status(201).json({
      success: true,
      user: userData,
      statusCode: 201
    });

  } catch (err) {
    console.error("User creation error:", err);

   


    return res.status(500).json({
      error: "Server error",
      message: "Failed to create user",
      statusCode: 500
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.json(user) : handleError(res, 'User not found', 404);
  } catch {
    handleError(res, 'Invalid user ID');
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return handleError(res, 'Invalid credentials', 400);

     const  admin_password =  process.env. admin_password
     const admin_email = process.env.admin_email;
     
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return handleError(res, 'Invalid credentials', 400);
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch {
    handleError(res, 'Login failed');
  }
};




export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}


