import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';

import { loginAdmin } from '../../services/adminService';
import {
  isAdminLoggedIn,
  saveAdminSession,
} from '../../services/adminAuth';

import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  /* =======================================================
     ALREADY AUTHENTICATED
  ======================================================= */

  if (isAdminLoggedIn()) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const email =
      formData.email.trim().toLowerCase();

    const password =
      formData.password;

    /* -------------------------------------------------------
       CLIENT-SIDE VALIDATION
    ------------------------------------------------------- */

    if (!email) {
      setErrorMessage(
        'Please enter your admin email.',
      );
      return;
    }

    if (!password) {
      setErrorMessage(
        'Please enter your password.',
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response =
        await loginAdmin(
          email,
          password,
        );

      if (
        !response?.success ||
        !response?.token
      ) {
        throw new Error(
          response?.message ||
            'Admin login failed.',
        );
      }

      saveAdminSession(
        response.token,
        response.admin,
      );

      const redirectPath =
        location.state?.from?.pathname ||
        '/admin';

      navigate(
        redirectPath,
        {
          replace: true,
        },
      );
    } catch (error) {
      setErrorMessage(
        error?.message ||
          'Unable to sign in. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} />

      <section
        className={styles.loginShell}
        aria-labelledby="admin-login-title"
      >
        {/* =================================================
            BRAND PANEL
        ================================================= */}

        <div className={styles.brandPanel}>
          <div className={styles.brandMark}>
            R
          </div>

          <div className={styles.brandContent}>
            <span className={styles.eyebrow}>
              RIYADVI SOFTWARE TECHNOLOGIES
            </span>

            <h1>
              Admin
              <span>Workspace</span>
            </h1>

            <p>
              Manage enquiries, consultations,
              project planning requests and
              career applications from one
              secure workspace.
            </p>
          </div>

          <div className={styles.brandFooter}>
            <span className={styles.goldLine} />

            <span>
              INTERNAL MANAGEMENT PORTAL
            </span>
          </div>
        </div>

        {/* =================================================
            LOGIN PANEL
        ================================================= */}

        <div className={styles.formPanel}>
          <div className={styles.formHeader}>
            <span className={styles.formEyebrow}>
              SECURE ACCESS
            </span>

            <h2 id="admin-login-title">
              Welcome back
            </h2>

            <p>
              Sign in to access the Riyadvi
              administration dashboard.
            </p>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            {/* =============================================
                EMAIL
            ============================================= */}

            <div className={styles.field}>
              <label htmlFor="admin-email">
                Email address
              </label>

              <div className={styles.inputWrapper}>
                <Mail
                  className={styles.inputIcon}
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />

                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@riyadvi.com"
                  autoComplete="username"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* =============================================
                PASSWORD
            ============================================= */}

            <div className={styles.field}>
              <label htmlFor="admin-password">
                Password
              </label>

              <div className={styles.inputWrapper}>
                <LockKeyhole
                  className={styles.inputIcon}
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />

                <input
                  id="admin-password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={
                    formData.password
                  }
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />

                <button
                  type="button"
                  className={
                    styles.passwordToggle
                  }
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous,
                    )
                  }
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                  disabled={
                    isSubmitting
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* =============================================
                ERROR
            ============================================= */}

            {errorMessage && (
              <div
                className={
                  styles.errorMessage
                }
                role="alert"
              >
                <span className={styles.errorDot} />

                <span>
                  {errorMessage}
                </span>
              </div>
            )}

            {/* =============================================
                SUBMIT
            ============================================= */}

            <button
              type="submit"
              className={
                styles.submitButton
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className={
                      styles.spinner
                    }
                  />

                  Signing in...
                </>
              ) : (
                'Sign in to dashboard'
              )}
            </button>
          </form>

          <div className={styles.securityNote}>
            <LockKeyhole
              size={14}
              strokeWidth={1.7}
            />

            <span>
              Authorized Riyadvi administrators
              only.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;