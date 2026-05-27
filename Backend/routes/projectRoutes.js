import express from 'express';
import { body } from 'express-validator';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules for creating/updating a project
const projectValidation = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('description').notEmpty().withMessage('Description is required').trim(),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['fullstack', 'ai-ml', 'frontend'])
    .withMessage('Category must be one of: fullstack, ai-ml, frontend'),
  body('techStack').optional().isArray().withMessage('techStack must be an array'),
  body('githubLink').optional().trim(),
  body('liveLink').optional().trim(),
  body('featured').optional().isBoolean().withMessage('featured must be a boolean'),
];

// Routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes
router.post('/', protect, projectValidation, createProject);
router.put('/:id', protect, projectValidation, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
