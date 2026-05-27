import { validationResult } from 'express-validator';
import Skill from '../models/Skill.js';

// @desc    Get all skills sorted by display order
// @route   GET /api/skills
// @access  Public
export const getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new skill category
// @route   POST /api/skills
// @access  Protected
export const createSkillCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { category, skills, order } = req.body;
    const newSkill = await Skill.create({ category, skills, order });

    res.status(201).json({
      success: true,
      data: newSkill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a skill category
// @route   PUT /api/skills/:id
// @access  Protected
export const updateSkillCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill category not found',
      });
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a skill category
// @route   DELETE /api/skills/:id
// @access  Protected
export const deleteSkillCategory = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Skill category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
