import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { isAdminLoggedIn } from '../../services/adminAuth';

const ProtectedAdminRoute = () => {
  const location = useLocation();

  const isAuthenticated =
    isAdminLoggedIn();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;