import { validationResult } from 'express-validator';
import Experience from '../models/Experience.js';

// @desc    Get all experience sorted by display order
// @route   GET /api/experience
// @access  Public
export const getAllExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new experience item
// @route   POST /api/experience
// @access  Protected
export const createExperience = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an experience item
// @route   PUT /api/experience/:id
// @access  Protected
export const updateExperience = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience item not found',
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an experience item
// @route   DELETE /api/experience/:id
// @access  Protected
export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Experience item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
