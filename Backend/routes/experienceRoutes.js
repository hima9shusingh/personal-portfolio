import express from 'express';
import { body } from 'express-validator';
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const experienceValidation = [
  body('role')
    .notEmpty().withMessage('Role is required')
    .trim(),
  body('company')
    .notEmpty().withMessage('Company is required')
    .trim(),
  body('location')
    .optional()
    .trim(),
  body('startDate')
    .notEmpty().withMessage('Start date is required')
    .trim(),
  body('endDate')
    .optional()
    .trim(),
  body('techStack')
    .optional()
    .isArray().withMessage('techStack must be an array of strings'),
  body('summary')
    .optional()
    .trim(),
  body('accomplishments')
    .optional()
    .isArray().withMessage('accomplishments must be an array of strings'),
  body('order')
    .optional()
    .isInt().withMessage('Order must be an integer'),
];

// Routes
router.get('/', getAllExperiences);
router.post('/', protect, experienceValidation, createExperience);
router.put('/:id', protect, experienceValidation, updateExperience);
router.delete('/:id', protect, deleteExperience);

export default router;
