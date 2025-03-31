import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN format
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user data to request object
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Error in protectRoute middleware:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
