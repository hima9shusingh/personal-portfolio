import { validationResult } from 'express-validator';
import Certification from '../models/Certification.js';

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
export const getAllCertifications = async (req, res, next) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: certs.length, data: certs });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new certification
// @route   POST /api/certifications
// @access  Protected
export const createCertification = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const cert = await Certification.create(req.body);
    res.status(201).json({ success: true, data: cert });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a certification
// @route   DELETE /api/certifications/:id
// @access  Protected
export const deleteCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.status(200).json({ success: true, message: 'Certification deleted successfully' });
  } catch (error) {
    next(error);
  }
};
