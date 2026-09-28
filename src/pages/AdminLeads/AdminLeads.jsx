import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Users,
} from 'lucide-react';

import {
  getAdminLeads,
  updateLeadStatus,
} from '../../services/adminService';

import styles from './AdminLeads.module.css';

const STATUS_OPTIONS = [
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'contacted',
    label: 'Contacted',
  },
  {
    value: 'in-progress',
    label: 'In Progress',
  },
  {
    value: 'converted',
    label: 'Converted',
  },
  {
    value: 'closed',
    label: 'Closed',
  },
];

const TYPE_OPTIONS = [
  {
    value: 'contact',
    label: 'Contact',
  },
  {
    value: 'health-checkup',
    label: 'Health Checkup',
  },
  {
    value: 'project-planning',
    label: 'Project Planning',
  },
];

const getStatusLabel = (status) => {
  const option = STATUS_OPTIONS.find(
    (item) => item.value === status,
  );

  return option?.label || 'New';
};

const getTypeLabel = (leadType) => {
  const option = TYPE_OPTIONS.find(
    (item) => item.value === leadType,
  );

  return option?.label || 'Enquiry';
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

const normalizeStatus = (status) => {
  if (!status) {
    return 'new';
  }

  return status;
};

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const loadLeads = async (showRefreshState = false) => {
    if (showRefreshState) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setErrorMessage('');
    setActionMessage('');

    try {
      const response = await getAdminLeads();

      if (!response?.success) {
        throw new Error(
          response?.message || 'Unable to load enquiries.',
        );
      }

      setLeads(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setErrorMessage(
        error?.message || 'Unable to load enquiries.',
      );
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return leads.filter((lead) => {
      const normalizedStatus = normalizeStatus(lead.status);

      const matchesSearch =
        !normalizedSearch ||
        [
          lead.name,
          lead.email,
          lead.phone,
          lead.company,
          lead.service,
          lead.message,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(normalizedSearch),
          );

      const matchesStatus =
        statusFilter === 'all' ||
        normalizedStatus === statusFilter;

      const matchesType =
        typeFilter === 'all' ||
        lead.leadType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    leads,
    searchQuery,
    statusFilter,
    typeFilter,
  ]);

  const handleStatusChange = async (leadId, nextStatus) => {
    if (!leadId || !nextStatus) {
      return;
    }

    setUpdatingLeadId(leadId);
    setActionMessage('');
    setErrorMessage('');

    try {
      const response = await updateLeadStatus(
        leadId,
        nextStatus,
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            'Unable to update enquiry status.',
        );
      }

      const updatedLead = response.data;

      setLeads((previousLeads) =>
        previousLeads.map((lead) =>
          lead._id === leadId
            ? {
                ...lead,
                ...updatedLead,
                status: nextStatus,
              }
            : lead,
        ),
      );

      setActionMessage(
        'Enquiry status updated successfully.',
      );
    } catch (error) {
      setErrorMessage(
        error?.message ||
          'Unable to update enquiry status.',
      );
    } finally {
      setUpdatingLeadId(null);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    statusFilter !== 'all' ||
    typeFilter !== 'all';

  return (
    <section className={styles.page}>
      {/* ============================================================
          HEADER
      ============================================================ */}

      <header className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <span className={styles.eyebrow}>
            LEAD MANAGEMENT
          </span>

          <h1 className={styles.title}>
            Enquiries
          </h1>

          <p className={styles.subtitle}>
            Review incoming enquiries and manage their
            progress from one workspace.
          </p>
        </div>

        <button
          type="button"
          className={styles.refreshButton}
          onClick={() => loadLeads(true)}
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
            onClick={() => loadLeads(true)}
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
            <Users
              size={19}
              strokeWidth={1.7}
            />
          </div>

          <div>
            <span className={styles.summaryLabel}>
              Total enquiries
            </span>

            <strong className={styles.summaryValue}>
              {isLoading ? '—' : leads.length}
            </strong>
          </div>
        </div>

        <div className={styles.summaryText}>
          Showing{' '}
          <strong>
            {isLoading
              ? '—'
              : filteredLeads.length}
          </strong>{' '}
          {filteredLeads.length === 1
            ? 'enquiry'
            : 'enquiries'}
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
            placeholder="Search by name, email, company or requirement..."
            className={styles.searchInput}
            aria-label="Search enquiries"
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.selectWrapper}>
            <label
              htmlFor="lead-status-filter"
              className={styles.filterLabel}
            >
              Status
            </label>

            <div className={styles.selectContainer}>
              <select
                id="lead-status-filter"
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

          <div className={styles.selectWrapper}>
            <label
              htmlFor="lead-type-filter"
              className={styles.filterLabel}
            >
              Type
            </label>

            <div className={styles.selectContainer}>
              <select
                id="lead-type-filter"
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
                className={styles.select}
              >
                <option value="all">
                  All types
                </option>

                {TYPE_OPTIONS.map((option) => (
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
          DESKTOP TABLE
      ============================================================ */}

      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div>
            <span className={styles.tableEyebrow}>
              ENQUIRY RECORDS
            </span>

            <h2 className={styles.tableTitle}>
              All enquiries
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
              Loading enquiries...
            </span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Users
                size={24}
                strokeWidth={1.5}
              />
            </div>

            <h3>
              No enquiries found
            </h3>

            <p>
              {hasActiveFilters
                ? 'Try changing your search or filters.'
                : 'No enquiries have been submitted yet.'}
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
            <div className={styles.desktopTableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Enquiry</th>
                    <th>Contact</th>
                    <th>Company</th>
                    <th>Requirement</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.map((lead) => {
                    const currentStatus =
                      normalizeStatus(lead.status);

                    const isUpdating =
                      updatingLeadId === lead._id;

                    return (
                      <tr key={lead._id}>
                        <td>
                          <div className={styles.personCell}>
                            <div
                              className={
                                styles.personAvatar
                              }
                            >
                              {lead.name
                                ?.charAt(0)
                                ?.toUpperCase() || 'E'}
                            </div>

                            <div
                              className={
                                styles.personDetails
                              }
                            >
                              <strong>
                                {lead.name || '—'}
                              </strong>

                              <span>
                                {lead.service ||
                                  'General enquiry'}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className={styles.contactCell}>
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}`}
                              >
                                <Mail size={13} />
                                {lead.email}
                              </a>
                            )}

                            {lead.phone && (
                              <a
                                href={`tel:${lead.phone}`}
                              >
                                <Phone size={13} />
                                {lead.phone}
                              </a>
                            )}

                            {!lead.email &&
                              !lead.phone && (
                                <span>—</span>
                              )}
                          </div>
                        </td>

                        <td>
                          <span
                            className={
                              styles.companyText
                            }
                          >
                            {lead.company || '—'}
                          </span>
                        </td>

                        <td>
                          <div
                            className={
                              styles.requirementCell
                            }
                            title={lead.message || ''}
                          >
                            {lead.message || '—'}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`${styles.typeBadge} ${
                              styles[
                                `type-${lead.leadType}`
                              ] || ''
                            }`}
                          >
                            {getTypeLabel(
                              lead.leadType,
                            )}
                          </span>
                        </td>

                        <td>
                          <span
                            className={styles.dateText}
                            title={formatDateTime(
                              lead.createdAt,
                            )}
                          >
                            {formatDate(
                              lead.createdAt,
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
                                  lead._id,
                                  event.target.value,
                                )
                              }
                              disabled={isUpdating}
                              className={`${styles.statusSelect} ${
                                styles[
                                  `status-${currentStatus}`
                                ] || ''
                              }`}
                              aria-label={`Update status for ${
                                lead.name || 'enquiry'
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ========================================================
                MOBILE CARDS
            ======================================================== */}

            <div className={styles.mobileCards}>
              {filteredLeads.map((lead) => {
                const currentStatus =
                  normalizeStatus(lead.status);

                const isUpdating =
                  updatingLeadId === lead._id;

                return (
                  <article
                    key={lead._id}
                    className={styles.leadCard}
                  >
                    <div className={styles.leadCardHeader}>
                      <div className={styles.personCell}>
                        <div
                          className={
                            styles.personAvatar
                          }
                        >
                          {lead.name
                            ?.charAt(0)
                            ?.toUpperCase() || 'E'}
                        </div>

                        <div
                          className={
                            styles.personDetails
                          }
                        >
                          <strong>
                            {lead.name || '—'}
                          </strong>

                          <span>
                            {lead.service ||
                              'General enquiry'}
                          </span>
                        </div>
                      </div>

                      <span className={styles.dateText}>
                        {formatDate(
                          lead.createdAt,
                        )}
                      </span>
                    </div>

                    <div className={styles.mobileInfoGrid}>
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
                          {lead.email || '—'}
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
                          {lead.phone || '—'}
                        </span>
                      </div>

                      <div>
                        <span
                          className={
                            styles.mobileLabel
                          }
                        >
                          Company
                        </span>

                        <span
                          className={
                            styles.mobileValue
                          }
                        >
                          {lead.company || '—'}
                        </span>
                      </div>

                      <div>
                        <span
                          className={
                            styles.mobileLabel
                          }
                        >
                          Type
                        </span>

                        <span
                          className={
                            styles.mobileValue
                          }
                        >
                          {getTypeLabel(
                            lead.leadType,
                          )}
                        </span>
                      </div>
                    </div>

                    <div
                      className={
                        styles.mobileRequirement
                      }
                    >
                      <span
                        className={
                          styles.mobileLabel
                        }
                      >
                        Requirement
                      </span>

                      <p>
                        {lead.message || '—'}
                      </p>
                    </div>

                    <div
                      className={
                        styles.mobileStatusRow
                      }
                    >
                      <span
                        className={
                          styles.mobileLabel
                        }
                      >
                        Status
                      </span>

                      <div
                        className={
                          styles.statusSelectWrapper
                        }
                      >
                        <select
                          value={currentStatus}
                          onChange={(event) =>
                            handleStatusChange(
                              lead._id,
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
                                value={option.value}
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
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </section>
  );
};

export default AdminLeads;