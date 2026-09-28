import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    /* ========================================
       CONTACT INFORMATION
    ======================================== */

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
      index: true,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      default: '',
    },

    company: {
      type: String,
      trim: true,
      maxlength: 150,
      default: '',
    },

    /* ========================================
       LEAD INFORMATION
    ======================================== */

    service: {
      type: String,
      trim: true,
      maxlength: 200,
      default: '',
    },

    message: {
      type: String,
      trim: true,
      maxlength: 10000,
      default: '',
    },

    /* ========================================
       LEAD TYPE
    ======================================== */

    leadType: {
      type: String,
      required: true,
      enum: [
        'contact',
        'health-checkup',
        'project-planning',
      ],
      index: true,
    },

    /* ========================================
       LEAD STATUS
    ======================================== */

    status: {
      type: String,
      enum: [
        'new',
        'contacted',
        'in-progress',
        'converted',
        'closed',
      ],
      default: 'new',
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Lead = mongoose.model(
  'Lead',
  leadSchema,
);

export default Lead;