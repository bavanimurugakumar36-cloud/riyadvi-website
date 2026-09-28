import Application from '../models/Application.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s.-]+$/;

const isValidUrl = (value) => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const createApplication = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      portfolio = '',
      resumeUrl = '',
      coverLetter,
      jobSlug,
      jobTitle,
      department,
      location,
    } = req.body;

    // Required fields
    if (
      !name ||
      !email ||
      !phone ||
      !coverLetter ||
      !jobSlug ||
      !jobTitle ||
      !department ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required application details.',
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const cleanPortfolio = String(portfolio || '').trim();
    const cleanResumeUrl = String(resumeUrl || '').trim();
    const cleanCoverLetter = String(coverLetter).trim();
    const cleanJobSlug = String(jobSlug).trim();
    const cleanJobTitle = String(jobTitle).trim();
    const cleanDepartment = String(department).trim();
    const cleanLocation = String(location).trim();

    // Name validation
    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters.',
      });
    }

    // Email validation
    if (
      cleanEmail.length > 150 ||
      !EMAIL_REGEX.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Phone validation
    if (
      cleanPhone.length > 30 ||
      !PHONE_REGEX.test(cleanPhone)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number.',
      });
    }

    // Cover letter validation
    if (
      cleanCoverLetter.length < 30 ||
      cleanCoverLetter.length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message: 'Cover letter must be between 30 and 3000 characters.',
      });
    }

    // Optional URL validation
    if (!isValidUrl(cleanPortfolio)) {
      return res.status(400).json({
        success: false,
        message: 'Portfolio / LinkedIn URL must be a valid HTTP or HTTPS URL.',
      });
    }

    if (!isValidUrl(cleanResumeUrl)) {
      return res.status(400).json({
        success: false,
        message: 'Resume URL must be a valid HTTP or HTTPS URL.',
      });
    }

    // Additional length validation
    if (cleanPortfolio.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Portfolio URL is too long.',
      });
    }

    if (cleanResumeUrl.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Resume URL is too long.',
      });
    }

    if (cleanJobSlug.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job reference.',
      });
    }

    if (
      cleanJobTitle.length > 150 ||
      cleanDepartment.length > 100 ||
      cleanLocation.length > 150
    ) {
      return res.status(400).json({
        success: false,
        message: 'Job information is invalid.',
      });
    }

    const application = await Application.create({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      portfolio: cleanPortfolio,
      resumeUrl: cleanResumeUrl,
      coverLetter: cleanCoverLetter,
      jobSlug: cleanJobSlug,
      jobTitle: cleanJobTitle,
      department: cleanDepartment,
      location: cleanLocation,
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      applicationId: application._id,
    });
  } catch (error) {
    next(error);
  }
};

export { createApplication };