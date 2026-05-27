import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
      trim: true,
    },
    endDate: {
      type: String,
      trim: true,
      default: 'Present',
    },
    techStack: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,
      trim: true,
      default: '',
    },
    accomplishments: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', ExperienceSchema);
export default Experience;
