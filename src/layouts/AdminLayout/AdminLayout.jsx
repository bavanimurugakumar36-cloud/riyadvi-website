import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  LogOut,
  Menu,
  X,
  Building2,
} from 'lucide-react';

import {
  getAdminUser,
  clearAdminSession,
} from '../../services/adminAuth';

import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const adminUser = getAdminUser();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: 'Enquiries',
      path: '/admin/leads',
      icon: Users,
    },
    {
      label: 'Applications',
      path: '/admin/applications',
      icon: BriefcaseBusiness,
    },
  ];

  const handleLogout = () => {
    clearAdminSession();
    setIsSidebarOpen(false);

    navigate('/admin/login', {
      replace: true,
    });
  };

  const handleNavigation = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.adminShell}>
      {isSidebarOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close admin navigation"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ''
        }`}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>
              <Building2 size={20} />
            </div>

            <div className={styles.brandText}>
              <span className={styles.brandName}>
                RIYADVI
              </span>

              <span className={styles.brandLabel}>
                ADMIN
              </span>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={21} />
          </button>
        </div>

        <nav
          className={styles.navigation}
          aria-label="Admin navigation"
        >
          <p className={styles.navigationLabel}>
            MANAGEMENT
          </p>

          {navigationItems.map(
            ({
              label,
              path,
              icon: Icon,
              end,
            }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `${styles.navItem} ${
                    isActive
                      ? styles.navItemActive
                      : ''
                  }`
                }
                onClick={handleNavigation}
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                />

                <span>{label}</span>
              </NavLink>
            ),
          )}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminIdentity}>
            <div className={styles.avatar}>
              {adminUser?.email
                ?.charAt(0)
                ?.toUpperCase() || 'A'}
            </div>

            <div className={styles.identityText}>
              <span className={styles.identityName}>
                Administrator
              </span>

              <span className={styles.identityEmail}>
                {adminUser?.email || 'Admin'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <LogOut
              size={18}
              strokeWidth={1.8}
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open admin navigation"
            aria-expanded={isSidebarOpen}
          >
            <Menu size={22} />
          </button>

          <div className={styles.topbarTitle}>
            <span>Riyadvi</span>

            <span className={styles.separator}>
              /
            </span>

            <span>Admin</span>
          </div>

          <div className={styles.topbarUser}>
            {adminUser?.email || 'Administrator'}
          </div>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;