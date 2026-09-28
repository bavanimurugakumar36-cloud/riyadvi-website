import { useEffect, useState } from 'react';
import {
  Activity,
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardList,
  Mail,
  RefreshCw,
  Users,
} from 'lucide-react';

import { getDashboardStats } from '../../services/adminService';
import styles from './AdminDashboard.module.css';

const statCards = [
  {
    key: 'totalLeads',
    label: 'Total Enquiries',
    icon: Users,
    description: 'All enquiries received',
  },
  {
    key: 'contactLeads',
    label: 'Consultation Requests',
    icon: CalendarCheck,
    description: 'Direct consultation enquiries',
  },
  {
    key: 'healthCheckupLeads',
    label: 'Health Checkup Leads',
    icon: Activity,
    description: 'Business health checkup requests',
  },
  {
    key: 'projectPlanningLeads',
    label: 'Project Planning Leads',
    icon: ClipboardList,
    description: 'Project planning / lead magnet requests',
  },
  {
    key: 'totalApplications',
    label: 'Job Applications',
    icon: BriefcaseBusiness,
    description: 'Career applications received',
  },
];

const formatNumber = (value) =>
  new Intl.NumberFormat('en-IN').format(Number(value) || 0);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadDashboard = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await getDashboardStats();

      if (!response?.success) {
        throw new Error(
          response?.message || 'Unable to load dashboard data.',
        );
      }

      setStats(response.data);
    } catch (error) {
      setErrorMessage(
        error?.message || 'Unable to load dashboard data.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <section className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>OVERVIEW</span>

          <h1 className={styles.title}>
            Dashboard
          </h1>

          <p className={styles.subtitle}>
            Monitor enquiries, lead activity and career applications
            from your Riyadvi workspace.
          </p>
        </div>

        <button
          type="button"
          className={styles.refreshButton}
          onClick={loadDashboard}
          disabled={isLoading}
        >
          <RefreshCw
            size={17}
            className={isLoading ? styles.spinning : ''}
          />

          <span>
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </span>
        </button>
      </div>

      {/* Error */}
      {errorMessage && (
        <div className={styles.errorBanner} role="alert">
          <div className={styles.errorIcon}>
            !
          </div>

          <div className={styles.errorContent}>
            <strong>Unable to load dashboard</strong>

            <span>{errorMessage}</span>
          </div>

          <button
            type="button"
            onClick={loadDashboard}
            className={styles.retryButton}
          >
            Try again
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className={styles.statsGrid}>
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.key}
              className={styles.statCard}
            >
              <div className={styles.statCardTop}>
                <div className={styles.iconWrapper}>
                  <Icon
                    size={20}
                    strokeWidth={1.7}
                  />
                </div>

                <span className={styles.statLabel}>
                  {card.label}
                </span>
              </div>

              <div className={styles.statValue}>
                {isLoading ? (
                  <span className={styles.skeletonValue}>
                    —
                  </span>
                ) : (
                  formatNumber(stats?.[card.key])
                )}
              </div>

              <p className={styles.statDescription}>
                {card.description}
              </p>
            </article>
          );
        })}
      </div>

      {/* Activity Overview */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>
              ACTIVITY
            </span>

            <h2 className={styles.sectionTitle}>
              Recent activity
            </h2>
          </div>
        </div>

        <div className={styles.activityGrid}>
          <article className={styles.activityCard}>
            <div className={styles.activityIcon}>
              <Mail size={19} strokeWidth={1.7} />
            </div>

            <div>
              <span className={styles.activityLabel}>
                New enquiries
              </span>

              <strong className={styles.activityValue}>
                {isLoading
                  ? '—'
                  : formatNumber(stats?.newLeads)}
              </strong>

              <p>
                Enquiries received during the last 24 hours.
              </p>
            </div>
          </article>

          <article className={styles.activityCard}>
            <div className={styles.activityIcon}>
              <BriefcaseBusiness
                size={19}
                strokeWidth={1.7}
              />
            </div>

            <div>
              <span className={styles.activityLabel}>
                New applications
              </span>

              <strong className={styles.activityValue}>
                {isLoading
                  ? '—'
                  : formatNumber(stats?.newApplications)}
              </strong>

              <p>
                Career applications received during the last
                24 hours.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* System Status */}
      <div className={styles.systemCard}>
        <div className={styles.systemIndicator}>
          <span />
        </div>

        <div className={styles.systemContent}>
          <strong>Admin system connected</strong>

          <span>
            Dashboard data is being retrieved from the Riyadvi
            backend.
          </span>
        </div>

        <span className={styles.systemStatus}>
          LIVE
        </span>
      </div>
    </section>
  );
};

export default AdminDashboard;