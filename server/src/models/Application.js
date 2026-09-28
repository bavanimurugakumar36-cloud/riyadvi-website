import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    portfolio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },

    resumeUrl: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
      minlength: 30,
      maxlength: 3000,
    },

    jobSlug: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    department: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    status: {
      type: String,
      enum: [
        'new',
        'reviewing',
        'shortlisted',
        'interview',
        'rejected',
        'hired',
      ],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;