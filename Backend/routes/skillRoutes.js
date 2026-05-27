import express from 'express';
import { body } from 'express-validator';
import {
  getAllSkills,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
} from '../controllers/skillController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const skillValidation = [
  body('category')
    .notEmpty().withMessage('Category name is required')
    .trim(),
  body('skills')
    .optional()
    .isArray().withMessage('Skills must be an array of strings'),
  body('order')
    .optional()
    .isInt().withMessage('Order must be an integer'),
];

// Routes
router.get('/', getAllSkills);
router.post('/', protect, skillValidation, createSkillCategory);
router.put('/:id', protect, skillValidation, updateSkillCategory);
router.delete('/:id', protect, deleteSkillCategory);

export default router;
