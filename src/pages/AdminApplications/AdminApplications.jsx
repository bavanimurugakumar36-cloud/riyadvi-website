import { useEffect, useMemo, useState } from 'react';
import {
  BriefcaseBusiness,
  ChevronDown,
  ExternalLink,
  Mail,
  Phone,
  RefreshCw,
  Search,
} from 'lucide-react';

import {
  getAdminApplications,
  updateApplicationStatus,
} from '../../services/adminService';

import styles from './AdminApplications.module.css';

const STATUS_OPTIONS = [
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'reviewing',
    label: 'Reviewing',
  },
  {
    value: 'shortlisted',
    label: 'Shortlisted',
  },
  {
    value: 'interview',
    label: 'Interview',
  },
  {
    value: 'rejected',
    label: 'Rejected',
  },
  {
    value: 'hired',
    label: 'Hired',
  },
];

const getStatusLabel = (status) => {
  const option = STATUS_OPTIONS.find(
    (item) => item.value === status,
  );

  return option?.label || 'New';
};

const normalizeStatus = (status) => {
  return status || 'new';
};

const formatDate = (dateValue) => {
  if (!dateValue) {
    return '—';
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const formatDateTime = (dateValue) => {
  if (!dateValue) {
    return '—';
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const isValidExternalUrl = (value) => {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:'
    );
  } catch {
    return false;
  }
};

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingApplicationId, setUpdatingApplicationId] =
    useState(null);

  const [expandedApplicationId, setExpandedApplicationId] =
    useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const loadApplications = async (showRefreshState = false) => {
    if (showRefreshState) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setErrorMessage('');
    setActionMessage('');

    try {
      const response = await getAdminApplications();

      if (!response?.success) {
        throw new Error(
          response?.message ||
            'Unable to load job applications.',
        );
      }

      setApplications(
        Array.isArray(response.data)
          ? response.data
          : [],
      );
    } catch (error) {
      setErrorMessage(
        error?.message ||
          'Unable to load job applications.',
      );
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const normalizedSearch =
      searchQuery.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          application.name,
          application.email,
          application.phone,
          application.jobTitle,
          application.department,
          application.location,
          application.coverLetter,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(normalizedSearch),
          );

      const matchesStatus =
        statusFilter === 'all' ||
        normalizeStatus(application.status) ===
          statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    applications,
    searchQuery,
    statusFilter,
  ]);

  const handleStatusChange = async (
    applicationId,
    nextStatus,
  ) => {
    if (!applicationId || !nextStatus) {
      return;
    }

    setUpdatingApplicationId(applicationId);
    setActionMessage('');
    setErrorMessage('');

    try {
      const response =
        await updateApplicationStatus(
          applicationId,
          nextStatus,
        );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            'Unable to update application status.',
        );
      }

      const updatedApplication = response.data;

      setApplications((previousApplications) =>
        previousApplications.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                ...updatedApplication,
                status: nextStatus,
              }
            : application,
        ),
      );

      setActionMessage(
        'Application status updated successfully.',
      );
    } catch (error) {
      setErrorMessage(
        error?.message ||
          'Unable to update application status.',
      );
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  const toggleApplication = (applicationId) => {
    setExpandedApplicationId((currentId) =>
      currentId === applicationId
        ? null
        : applicationId,
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    statusFilter !== 'all';

  return (
    <section className={styles.page}>
      {/* ============================================================
          HEADER
      ============================================================ */}

      <header className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <span className={styles.eyebrow}>
            CAREER MANAGEMENT
          </span>

          <h1 className={styles.title}>
            Applications
          </h1>

          <p className={styles.subtitle}>
            Review candidates, inspect application details
            and manage recruitment progress.
          </p>
        </div>

        <button
          type="button"
          className={styles.refreshButton}
          onClick={() => loadApplications(true)}
          disabled={isLoading || refreshing}
        >
          <RefreshCw
            size={17}
            className={
              refreshing ? styles.spinning : ''
            }
          />

          <span>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </span>
        </button>
      </header>

      {/* ============================================================
          NOTIFICATIONS
      ============================================================ */}

      {errorMessage && (
        <div
          className={styles.errorBanner}
          role="alert"
        >
          <div className={styles.errorIndicator}>
            !
          </div>

          <div className={styles.messageContent}>
            <strong>
              Something went wrong
            </strong>

            <span>{errorMessage}</span>
          </div>

          <button
            type="button"
            className={styles.retryButton}
            onClick={() => loadApplications(true)}
          >
            Try again
          </button>
        </div>
      )}

      {actionMessage && !errorMessage && (
        <div
          className={styles.successBanner}
          role="status"
        >
          <span className={styles.successDot} />

          <span>{actionMessage}</span>
        </div>
      )}

      {/* ============================================================
          SUMMARY
      ============================================================ */}

      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <BriefcaseBusiness
              size={19}
              strokeWidth={1.7}
            />
          </div>

          <div>
            <span className={styles.summaryLabel}>
              Total applications
            </span>

            <strong className={styles.summaryValue}>
              {isLoading
                ? '—'
                : applications.length}
            </strong>
          </div>
        </div>

        <div className={styles.summaryText}>
          Showing{' '}
          <strong>
            {isLoading
              ? '—'
              : filteredApplications.length}
          </strong>{' '}
          {filteredApplications.length === 1
            ? 'application'
            : 'applications'}
        </div>
      </div>

      {/* ============================================================
          FILTERS
      ============================================================ */}

      <section className={styles.filterPanel}>
        <div className={styles.searchWrapper}>
          <Search
            className={styles.searchIcon}
            size={18}
            strokeWidth={1.7}
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search by candidate, email, job title or department..."
            className={styles.searchInput}
            aria-label="Search applications"
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.selectWrapper}>
            <label
              htmlFor="application-status-filter"
              className={styles.filterLabel}
            >
              Status
            </label>

            <div className={styles.selectContainer}>
              <select
                id="application-status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className={styles.select}
              >
                <option value="all">
                  All statuses
                </option>

                {STATUS_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                className={styles.selectIcon}
                size={16}
                strokeWidth={1.7}
              />
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* ============================================================
          APPLICATION RECORDS
      ============================================================ */}

      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div>
            <span className={styles.tableEyebrow}>
              CANDIDATE RECORDS
            </span>

            <h2 className={styles.tableTitle}>
              All applications
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingState}>
            <RefreshCw
              size={21}
              className={styles.spinning}
            />

            <span>
              Loading applications...
            </span>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <BriefcaseBusiness
                size={24}
                strokeWidth={1.5}
              />
            </div>

            <h3>
              No applications found
            </h3>

            <p>
              {hasActiveFilters
                ? 'Try changing your search or filter.'
                : 'No job applications have been submitted yet.'}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                className={styles.emptyButton}
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ======================================================
                DESKTOP TABLE
            ====================================================== */}

            <div className={styles.desktopTableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Position</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Applied</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map(
                    (application) => {
                      const currentStatus =
                        normalizeStatus(
                          application.status,
                        );

                      const isUpdating =
                        updatingApplicationId ===
                        application._id;

                      const isExpanded =
                        expandedApplicationId ===
                        application._id;

                      return (
                        <tr
                          key={application._id}
                          className={
                            isExpanded
                              ? styles.expandedRow
                              : ''
                          }
                        >
                          <td>
                            <div
                              className={
                                styles.personCell
                              }
                            >
                              <div
                                className={
                                  styles.personAvatar
                                }
                              >
                                {application.name
                                  ?.charAt(0)
                                  ?.toUpperCase() ||
                                  'A'}
                              </div>

                              <div
                                className={
                                  styles.personDetails
                                }
                              >
                                <strong>
                                  {application.name ||
                                    '—'}
                                </strong>

                                <span>
                                  {application.email ||
                                    '—'}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div
                              className={
                                styles.positionCell
                              }
                            >
                              <strong>
                                {application.jobTitle ||
                                  '—'}
                              </strong>

                              <span>
                                {application.department ||
                                  '—'}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div
                              className={
                                styles.contactCell
                              }
                            >
                              {application.email && (
                                <a
                                  href={`mailto:${application.email}`}
                                >
                                  <Mail size={13} />
                                  {application.email}
                                </a>
                              )}

                              {application.phone && (
                                <a
                                  href={`tel:${application.phone}`}
                                >
                                  <Phone size={13} />
                                  {application.phone}
                                </a>
                              )}
                            </div>
                          </td>

                          <td>
                            <span
                              className={
                                styles.locationText
                              }
                            >
                              {application.location ||
                                '—'}
                            </span>
                          </td>

                          <td>
                            <span
                              className={styles.dateText}
                              title={formatDateTime(
                                application.createdAt,
                              )}
                            >
                              {formatDate(
                                application.createdAt,
                              )}
                            </span>
                          </td>

                          <td>
                            <div
                              className={
                                styles.statusSelectWrapper
                              }
                            >
                              <select
                                value={currentStatus}
                                onChange={(event) =>
                                  handleStatusChange(
                                    application._id,
                                    event.target.value,
                                  )
                                }
                                disabled={isUpdating}
                                className={`${styles.statusSelect} ${
                                  styles[
                                    `status-${currentStatus}`
                                  ] || ''
                                }`}
                              >
                                {STATUS_OPTIONS.map(
                                  (option) => (
                                    <option
                                      key={
                                        option.value
                                      }
                                      value={
                                        option.value
                                      }
                                    >
                                      {option.label}
                                    </option>
                                  ),
                                )}
                              </select>

                              <ChevronDown
                                size={14}
                                className={
                                  styles.statusChevron
                                }
                              />
                            </div>
                          </td>

                          <td>
                            <button
                              type="button"
                              className={
                                styles.detailsButton
                              }
                              onClick={() =>
                                toggleApplication(
                                  application._id,
                                )
                              }
                            >
                              {isExpanded
                                ? 'Hide'
                                : 'View'}
                            </button>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>

            {/* ======================================================
                MOBILE CARDS
            ====================================================== */}

            <div className={styles.mobileCards}>
              {filteredApplications.map(
                (application) => {
                  const currentStatus =
                    normalizeStatus(
                      application.status,
                    );

                  const isUpdating =
                    updatingApplicationId ===
                    application._id;

                  const isExpanded =
                    expandedApplicationId ===
                    application._id;

                  return (
                    <article
                      key={application._id}
                      className={styles.applicationCard}
                    >
                      <div
                        className={
                          styles.applicationHeader
                        }
                      >
                        <div
                          className={
                            styles.personCell
                          }
                        >
                          <div
                            className={
                              styles.personAvatar
                            }
                          >
                            {application.name
                              ?.charAt(0)
                              ?.toUpperCase() || 'A'}
                          </div>

                          <div
                            className={
                              styles.personDetails
                            }
                          >
                            <strong>
                              {application.name ||
                                '—'}
                            </strong>

                            <span>
                              {application.jobTitle ||
                                '—'}
                            </span>
                          </div>
                        </div>

                        <span
                          className={
                            styles.dateText
                          }
                        >
                          {formatDate(
                            application.createdAt,
                          )}
                        </span>
                      </div>

                      <div
                        className={
                          styles.mobileInfoGrid
                        }
                      >
                        <div>
                          <span
                            className={
                              styles.mobileLabel
                            }
                          >
                            Department
                          </span>

                          <span
                            className={
                              styles.mobileValue
                            }
                          >
                            {application.department ||
                              '—'}
                          </span>
                        </div>

                        <div>
                          <span
                            className={
                              styles.mobileLabel
                            }
                          >
                            Location
                          </span>

                          <span
                            className={
                              styles.mobileValue
                            }
                          >
                            {application.location ||
                              '—'}
                          </span>
                        </div>

                        <div>
                          <span
                            className={
                              styles.mobileLabel
                            }
                          >
                            Email
                          </span>

                          <span
                            className={
                              styles.mobileValue
                            }
                          >
                            {application.email ||
                              '—'}
                          </span>
                        </div>

                        <div>
                          <span
                            className={
                              styles.mobileLabel
                            }
                          >
                            Phone
                          </span>

                          <span
                            className={
                              styles.mobileValue
                            }
                          >
                            {application.phone ||
                              '—'}
                          </span>
                        </div>
                      </div>

                      <div
                        className={
                          styles.mobileActionRow
                        }
                      >
                        <div
                          className={
                            styles.statusSelectWrapper
                          }
                        >
                          <select
                            value={currentStatus}
                            onChange={(event) =>
                              handleStatusChange(
                                application._id,
                                event.target.value,
                              )
                            }
                            disabled={isUpdating}
                            className={`${styles.statusSelect} ${
                              styles[
                                `status-${currentStatus}`
                              ] || ''
                            }`}
                          >
                            {STATUS_OPTIONS.map(
                              (option) => (
                                <option
                                  key={option.value}
                                  value={
                                    option.value
                                  }
                                >
                                  {option.label}
                                </option>
                              ),
                            )}
                          </select>

                          <ChevronDown
                            size={14}
                            className={
                              styles.statusChevron
                            }
                          />
                        </div>

                        <button
                          type="button"
                          className={
                            styles.detailsButton
                          }
                          onClick={() =>
                            toggleApplication(
                              application._id,
                            )
                          }
                        >
                          {isExpanded
                            ? 'Hide details'
                            : 'View details'}
                        </button>
                      </div>

                      {isExpanded && (
                        <ApplicationDetails
                          application={
                            application
                          }
                        />
                      )}
                    </article>
                  );
                },
              )}
            </div>

            {/* ======================================================
                DESKTOP EXPANDED DETAILS
            ====================================================== */}

            {expandedApplicationId &&
              filteredApplications.some(
                (application) =>
                  application._id ===
                  expandedApplicationId,
              ) && (
                <div className={styles.desktopDetails}>
                  <ApplicationDetails
                    application={filteredApplications.find(
                      (application) =>
                        application._id ===
                        expandedApplicationId,
                    )}
                  />
                </div>
              )}
          </>
        )}
      </section>
    </section>
  );
};

const ApplicationDetails = ({
  application,
}) => {
  if (!application) {
    return null;
  }

  return (
    <div className={styles.detailsPanel}>
      <div className={styles.detailsHeader}>
        <div>
          <span className={styles.detailsEyebrow}>
            APPLICATION DETAILS
          </span>

          <h3>
            {application.name || 'Candidate'}
          </h3>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span>Candidate email</span>

          <a
            href={`mailto:${application.email}`}
          >
            {application.email || '—'}
          </a>
        </div>

        <div className={styles.detailItem}>
          <span>Phone</span>

          <a
            href={`tel:${application.phone}`}
          >
            {application.phone || '—'}
          </a>
        </div>

        <div className={styles.detailItem}>
          <span>Position</span>

          <strong>
            {application.jobTitle || '—'}
          </strong>
        </div>

        <div className={styles.detailItem}>
          <span>Department</span>

          <strong>
            {application.department || '—'}
          </strong>
        </div>

        <div className={styles.detailItem}>
          <span>Location</span>

          <strong>
            {application.location || '—'}
          </strong>
        </div>

        <div className={styles.detailItem}>
          <span>Applied on</span>

          <strong>
            {formatDateTime(
              application.createdAt,
            )}
          </strong>
        </div>
      </div>

      <div className={styles.coverLetterSection}>
        <span className={styles.detailLabel}>
          Cover letter
        </span>

        <p>
          {application.coverLetter ||
            'No cover letter provided.'}
        </p>
      </div>

      <div className={styles.applicationLinks}>
        {isValidExternalUrl(
          application.portfolio,
        ) && (
          <a
            href={application.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            <ExternalLink size={14} />
            Portfolio
          </a>
        )}

        {isValidExternalUrl(
          application.resumeUrl,
        ) && (
          <a
            href={application.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            <ExternalLink size={14} />
            Resume
          </a>
        )}

        {!isValidExternalUrl(
          application.portfolio,
        ) &&
          !isValidExternalUrl(
            application.resumeUrl,
          ) && (
            <span className={styles.noLinks}>
              No portfolio or resume link provided.
            </span>
          )}
      </div>
    </div>
  );
};

export default AdminApplications;