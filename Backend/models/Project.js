import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: ['fullstack', 'ai-ml', 'frontend'],
        message: 'Category must be one of: fullstack, ai-ml, frontend',
      },
      required: [true, 'Category is required'],
    },
    techStack: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
      trim: true,
      default: '',
    },
    liveLink: {
      type: String,
      trim: true,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
