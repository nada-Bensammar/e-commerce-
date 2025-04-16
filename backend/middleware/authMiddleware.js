import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  
  const token = req.header('Authorization')?.replace('Bearer ', ''); //  replace('Bearer ', '')  :Removes the "Bearer " prefix from the token
  // // ?. : Safely accesses the header only if it exists
  
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Authentication required. Please provide a valid token.' 
    });
  }


  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
   
    req.user = { 
      userId: decoded.userId,
      token 
    };
    
   
    next();
    
  } catch (err) {
    
    let errorMessage = 'Invalid authentication token';
    
    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Session expired. Please login again.';
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token format';
    }

    res.status(401).json({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};


export const admin= (req, res, next) => {
  authMiddleware(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized. Admin privileges required.'
      });
    }
    next();
  });
};