import express from 'express';
import multer from 'multer';
import protect from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerConfig.js';
import { downloadResume, uploadResume } from '../controllers/resumeController.js';

const router = express.Router();

// @desc    Download resume PDF
// @route   GET /api/resume/download
// @access  Public
router.get('/download', downloadResume);

// @desc    Upload / replace resume PDF
// @route   POST /api/resume/upload
// @access  Protected
router.post('/upload', protect, (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
}, uploadResume);

export default router;
