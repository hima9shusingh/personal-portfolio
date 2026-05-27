import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      trim: true,
    },
    skills: {
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

const Skill = mongoose.model('Skill', SkillSchema);
export default Skill;
