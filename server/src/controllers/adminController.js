import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Lead from '../models/Lead.js';
import Application from '../models/Application.js';

/* =========================================================
   ADMIN LOGIN
========================================================= */

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash =
      process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (
      !adminEmail ||
      !adminPasswordHash ||
      !jwtSecret
    ) {
      console.error(
        'Admin authentication environment variables are missing.',
      );

      return res.status(500).json({
        success: false,
        message:
          'Admin authentication is not configured.',
      });
    }

    const normalizedEmail = String(email)
      .trim()
      .toLowerCase();

    if (
      normalizedEmail !==
      adminEmail.trim().toLowerCase()
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        String(password),
        adminPasswordHash,
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      {
        role: 'admin',
        email: normalizedEmail,
      },
      jwtSecret,
      {
        expiresIn: '8h',
      },
    );

    return res.status(200).json({
      success: true,
      message: 'Admin login successful.',
      token,
      admin: {
        email: normalizedEmail,
        role: 'admin',
      },
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

const getDashboardStats = async (
  req,
  res,
  next,
) => {
  try {
    const [
      totalLeads,
      contactLeads,
      healthCheckupLeads,
      projectPlanningLeads,
      totalApplications,
      newLeads,
      newApplications,
    ] = await Promise.all([
      /* Total enquiries */
      Lead.countDocuments(),

      /* Contact enquiries */
      Lead.countDocuments({
        leadType: 'contact',
      }),

      /* Business Health Checkup leads */
      Lead.countDocuments({
        leadType: 'health-checkup',
      }),

      /* Project Planning Guide leads */
      Lead.countDocuments({
        leadType: 'project-planning',
      }),

      /* Job applications */
      Application.countDocuments(),

      /* Leads submitted during the last 24 hours */
      Lead.countDocuments({
        createdAt: {
          $gte: new Date(
            Date.now() -
              24 * 60 * 60 * 1000,
          ),
        },
      }),

      /* Applications submitted during the last 24 hours */
      Application.countDocuments({
        createdAt: {
          $gte: new Date(
            Date.now() -
              24 * 60 * 60 * 1000,
          ),
        },
      }),
    ]);

    return res.status(200).json({
      success: true,

      data: {
        totalLeads,
        contactLeads,
        healthCheckupLeads,
        projectPlanningLeads,
        totalApplications,
        newLeads,
        newApplications,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   GET ALL LEADS
========================================================= */

const getAdminLeads = async (
  req,
  res,
  next,
) => {
  try {
    const leads = await Lead.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   UPDATE LEAD STATUS
========================================================= */

const updateLeadStatus = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      'new',
      'contacted',
      'in-progress',
      'converted',
      'closed',
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Lead status is required.',
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead status.',
      });
    }

    const lead =
      await Lead.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        },
      ).lean();

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Lead status updated successfully.',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   GET ALL JOB APPLICATIONS
========================================================= */

const getAdminApplications = async (
  req,
  res,
  next,
) => {
  try {
    const applications =
      await Application.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   UPDATE APPLICATION STATUS
========================================================= */

const updateApplicationStatus =
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const allowedStatuses = [
        'new',
        'reviewing',
        'shortlisted',
        'interview',
        'rejected',
        'hired',
      ];

      if (!status) {
        return res.status(400).json({
          success: false,
          message:
            'Application status is required.',
        });
      }

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            'Invalid application status.',
        });
      }

      const application =
        await Application.findByIdAndUpdate(
          id,
          {
            status,
          },
          {
            new: true,
            runValidators: true,
          },
        ).lean();

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            'Application not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message:
          'Application status updated successfully.',
        data: application,
      });
    } catch (error) {
      next(error);
    }
  };

/* =========================================================
   EXPORT CONTROLLERS
========================================================= */

export {
  loginAdmin,
  getDashboardStats,
  getAdminLeads,
  updateLeadStatus,
  getAdminApplications,
  updateApplicationStatus,
};