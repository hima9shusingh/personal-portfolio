import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Certification name is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
    },
    issueDate: {
      type: String,
      trim: true,
      default: '',
    },
    credentialId: {
      type: String,
      trim: true,
      default: '',
    },
    certificateLink: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

const Certification = mongoose.model('Certification', CertificationSchema);
export default Certification;
