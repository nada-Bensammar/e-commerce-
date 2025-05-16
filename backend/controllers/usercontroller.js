import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const handleError = (res, message, status = 500) =>
  res.status(status).json({ error: message });


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch {
    handleError(res, 'Failed to fetch users');
  }
};


export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Name, email, and password are required',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'Duplicate email',
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userData = newUser.toObject();
    delete userData.password;

    return res.status(201).json({
      success: true,
      user: userData,
    });
  } catch (err) {
    console.error('User creation error:', err);
    return handleError(res, 'Failed to create user');
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
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

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return handleError(res, 'Invalid credentials', 400);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch {
    handleError(res, 'Login failed');
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch {
    handleError(res, 'Failed to delete user');
  }
};
