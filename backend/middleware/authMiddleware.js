const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};


const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { authMiddleware, hashPassword, comparePassword };
