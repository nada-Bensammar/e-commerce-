import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js'

// Protect routes - user must be logged in
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer') 
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password'); 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not authorized, token failed' });
  }
};

// Admin check - user must be admin
export const admin = (req, res, next) => {
  if (req.admin && req.admin.role === 'admin') {  
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as admin' });
  }
};
