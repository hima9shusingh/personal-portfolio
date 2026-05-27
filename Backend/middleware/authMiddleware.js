import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verify if the token corresponds to the admin email
      if (decoded.email !== process.env.ADMIN_EMAIL) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, invalid admin credentials',
        });
      }

      // Attach admin to request
      req.user = { email: decoded.email };
      next();
    } catch (error) {
      console.error(`[AUTH ERROR] ${error.message}`);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};

export default protect;
