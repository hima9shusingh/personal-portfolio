import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define absolute path for upload directory
const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Keep it static as 'resume.pdf' to always overwrite/serve the correct file
    cb(null, 'resume.pdf');
  },
});

// File Filter - only PDF allowed
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});
