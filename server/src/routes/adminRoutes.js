import express from 'express';

import {
  loginAdmin,
  getDashboardStats,
  getAdminLeads,
  updateLeadStatus,
  getAdminApplications,
  updateApplicationStatus,
} from '../controllers/adminController.js';

import requireAdminAuth from '../middleware/adminAuth.js';

const router = express.Router();

/* =========================================================
   ADMIN AUTHENTICATION
========================================================= */

// Admin login
router.post(
  '/login',
  loginAdmin,
);

// Verify admin session
router.get(
  '/verify',
  requireAdminAuth,
  (req, res) =>
    res.status(200).json({
      success: true,
      message: 'Admin authentication is valid.',
      admin: {
        email: req.admin.email,
        role: req.admin.role,
      },
    }),
);

/* =========================================================
   DASHBOARD
========================================================= */

router.get(
  '/dashboard',
  requireAdminAuth,
  getDashboardStats,
);

/* =========================================================
   LEADS
========================================================= */

// Get all leads
router.get(
  '/leads',
  requireAdminAuth,
  getAdminLeads,
);

// Update lead status
router.patch(
  '/leads/:id/status',
  requireAdminAuth,
  updateLeadStatus,
);

/* =========================================================
   JOB APPLICATIONS
========================================================= */

// Get all applications
router.get(
  '/applications',
  requireAdminAuth,
  getAdminApplications,
);

// Update application status
router.patch(
  '/applications/:id/status',
  requireAdminAuth,
  updateApplicationStatus,
);

export default router;