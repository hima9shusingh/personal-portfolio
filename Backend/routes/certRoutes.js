import express from 'express';
import { body } from 'express-validator';
import {
  getAllCertifications,
  createCertification,
  deleteCertification,
} from '../controllers/certController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules for adding a certification
const certValidation = [
  body('name')
    .notEmpty().withMessage('Certification name is required')
    .trim(),
  body('issuer')
    .notEmpty().withMessage('Issuer is required')
    .trim(),
  body('issueDate').optional().trim(),
  body('credentialId').optional().trim(),
  body('certificateLink').optional().trim(),
];

// Routes
router.get('/', getAllCertifications);

// Protected routes
router.post('/', protect, certValidation, createCertification);
router.delete('/:id', protect, deleteCertification);

export default router;
