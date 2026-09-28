import Lead from '../models/Lead.js';

const ALLOWED_LEAD_TYPES = [
  'contact',
  'health-checkup',
  'project-planning',
];

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_PATTERN =
  /^[+()\d\s.-]{7,30}$/;

const normalizeString = (
  value,
) => {
  if (
    value === undefined ||
    value === null
  ) {
    return '';
  }

  return String(value).trim();
};

const createLead = async (
  req,
  res,
  next,
) => {
  try {
    const body =
      req.body || {};

    /* ========================================
       NORMALIZE INPUT
    ======================================== */

    const name =
      normalizeString(body.name);

    const email =
      normalizeString(body.email)
        .toLowerCase();

    const phone =
      normalizeString(body.phone);

    const company =
      normalizeString(body.company);

    const service =
      normalizeString(body.service);

    const message =
      normalizeString(body.message);

    const leadType =
      normalizeString(
        body.leadType,
      );

    /* ========================================
       REQUIRED FIELDS
    ======================================== */

    if (
      !name ||
      !email ||
      !leadType
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Name, email and lead type are required.',
      });
    }

    /* ========================================
       NAME VALIDATION
    ======================================== */

    if (
      name.length < 2 ||
      name.length > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Name must be between 2 and 100 characters.',
      });
    }

    /* ========================================
       EMAIL VALIDATION
    ======================================== */

    if (
      email.length > 150 ||
      !EMAIL_PATTERN.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide a valid email address.',
      });
    }

    /* ========================================
       LEAD TYPE VALIDATION
    ======================================== */

    if (
      !ALLOWED_LEAD_TYPES.includes(
        leadType,
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid lead type.',
      });
    }

    /* ========================================
       PHONE VALIDATION
    ======================================== */

    if (phone) {
      if (
        phone.length > 30 ||
        !PHONE_PATTERN.test(phone)
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Please provide a valid phone number.',
        });
      }
    }

    /* ========================================
       COMPANY VALIDATION
    ======================================== */

    if (company.length > 150) {
      return res.status(400).json({
        success: false,
        message:
          'Company name is too long.',
      });
    }

    /* ========================================
       SERVICE VALIDATION
    ======================================== */

    if (service.length > 200) {
      return res.status(400).json({
        success: false,
        message:
          'Service value is too long.',
      });
    }

    /* ========================================
       MESSAGE VALIDATION
    ======================================== */

    if (message.length > 10000) {
  return res.status(400).json({
    success: false,
    message:
      'Message must not exceed 10000 characters.',
  });
}

    /* ========================================
       CREATE LEAD
    ======================================== */

    const lead =
      await Lead.create({
        name,
        email,
        phone,
        company,
        service,
        message,
        leadType,
      });

    /* ========================================
       SUCCESS RESPONSE
    ======================================== */

    return res.status(201).json({
      success: true,
      message:
        'Your enquiry has been submitted successfully.',
      data: {
        id: lead._id,
        leadType: lead.leadType,
        createdAt:
          lead.createdAt,
      },
    });
  } catch (error) {
    console.error(
      'Create lead error:',
      error,
    );

    /*
     * Mongoose validation error
     */
    if (
      error.name ===
      'ValidationError'
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please check the submitted information.',
      });
    }

    /*
     * Unexpected error
     */
    return next(error);
  }
};

export {
  createLead,
};