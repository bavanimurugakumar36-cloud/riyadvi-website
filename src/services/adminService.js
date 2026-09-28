import axios from 'axios';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000/api'
).replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* =========================================================
   ADMIN LOGIN
========================================================= */

const loginAdmin = async (
  email,
  password,
) => {
  try {
    const response = await api.post(
      '/admin/login',
      {
        email,
        password,
      },
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Unable to sign in to the admin dashboard.';

    throw new Error(message);
  }
};

/* =========================================================
   AUTHENTICATED REQUEST CONFIG
========================================================= */

const getAuthConfig = () => {
  const token =
    localStorage.getItem('riyadvi_admin_token');

  if (!token) {
    throw new Error(
      'Admin session not found. Please log in again.',
    );
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* =========================================================
   VERIFY ADMIN SESSION
========================================================= */

const verifyAdminSession = async () => {
  try {
    const response = await api.get(
      '/admin/verify',
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Your admin session is no longer valid.';

    throw new Error(message);
  }
};

/* =========================================================
   DASHBOARD
========================================================= */

const getDashboardStats = async () => {
  try {
    const response = await api.get(
      '/admin/dashboard',
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Unable to load dashboard statistics.';

    throw new Error(message);
  }
};

/* =========================================================
   LEADS
========================================================= */

const getAdminLeads = async () => {
  try {
    const response = await api.get(
      '/admin/leads',
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Unable to load enquiries.';

    throw new Error(message);
  }
};

/* =========================================================
   UPDATE LEAD STATUS
========================================================= */

const updateLeadStatus = async (
  leadId,
  status,
) => {
  try {
    const response = await api.patch(
      `/admin/leads/${leadId}/status`,
      {
        status,
      },
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Unable to update lead status.';

    throw new Error(message);
  }
};

/* =========================================================
   APPLICATIONS
========================================================= */

const getAdminApplications = async () => {
  try {
    const response = await api.get(
      '/admin/applications',
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Unable to load job applications.';

    throw new Error(message);
  }
};

/* =========================================================
   UPDATE APPLICATION STATUS
========================================================= */

const updateApplicationStatus = async (
  applicationId,
  status,
) => {
  try {
    const response = await api.patch(
      `/admin/applications/${applicationId}/status`,
      {
        status,
      },
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Unable to update application status.';

    throw new Error(message);
  }
};

/* =========================================================
   LOGOUT
========================================================= */

const logoutAdmin = () => {
  localStorage.removeItem(
    'riyadvi_admin_token',
  );

  localStorage.removeItem(
    'riyadvi_admin_user',
  );
};

/* =========================================================
   EXPORTS
========================================================= */

export {
  loginAdmin,
  verifyAdminSession,
  getDashboardStats,
  getAdminLeads,
  updateLeadStatus,
  getAdminApplications,
  updateApplicationStatus,
  logoutAdmin,
};