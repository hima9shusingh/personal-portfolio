import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check if email matches admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const envPassword = process.env.ADMIN_PASSWORD || '';
    let isMatch = false;

    // Check if the environment password is pre-hashed with bcrypt
    const isBcryptHash =
      envPassword.startsWith('$2a$') ||
      envPassword.startsWith('$2b$') ||
      envPassword.startsWith('$2y$');

    if (isBcryptHash) {
      isMatch = await bcrypt.compare(password, envPassword);
    } else {
      // If plaintext, compare candidate with the bcrypt hash of the env password
      // to ensure bcryptjs is used for comparison
      const salt = await bcrypt.genSalt(10);
      const hashedEnvPassword = await bcrypt.hash(envPassword, salt);
      isMatch = await bcrypt.compare(password, hashedEnvPassword);
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      message: 'Logged in successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin user details
// @route   GET /api/auth/me
// @access  Protected
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        email: req.user.email,
        role: 'admin',
      },
    });
  } catch (error) {
    next(error);
  }
};
