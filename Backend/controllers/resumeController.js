import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'uploads');

export const downloadResume = (req, res, next) => {
  try {
    const filePath = path.join(uploadDir, 'resume.pdf');

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found. Please upload one first.',
      });
    }

    res.download(filePath, 'resume.pdf', (err) => {
      if (err) {
        if (!res.headersSent) {
          next(err);
        } else {
          console.error(err);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const uploadResume = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a resume PDF file to upload',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Resume PDF uploaded successfully',
    data: {
      filename: req.file.filename,
      size: req.file.size,
    },
  });
};
