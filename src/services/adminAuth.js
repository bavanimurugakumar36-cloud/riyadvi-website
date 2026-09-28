const ADMIN_TOKEN_KEY = 'riyadvi_admin_token';
const ADMIN_USER_KEY = 'riyadvi_admin_user';

/* =========================================================
   SAVE ADMIN SESSION
========================================================= */

const saveAdminSession = (
  token,
  admin,
) => {
  if (!token) {
    throw new Error(
      'Admin authentication token is missing.',
    );
  }

  localStorage.setItem(
    ADMIN_TOKEN_KEY,
    token,
  );

  if (admin) {
    localStorage.setItem(
      ADMIN_USER_KEY,
      JSON.stringify(admin),
    );
  }
};

/* =========================================================
   GET ADMIN TOKEN
========================================================= */

const getAdminToken = () => {
  return localStorage.getItem(
    ADMIN_TOKEN_KEY,
  );
};

/* =========================================================
   GET ADMIN USER
========================================================= */

const getAdminUser = () => {
  const storedUser =
    localStorage.getItem(
      ADMIN_USER_KEY,
    );

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(
      ADMIN_USER_KEY,
    );

    return null;
  }
};

/* =========================================================
   CHECK WHETHER ADMIN IS LOGGED IN
========================================================= */

const isAdminLoggedIn = () => {
  return Boolean(
    getAdminToken(),
  );
};

/* =========================================================
   CLEAR ADMIN SESSION
========================================================= */

const clearAdminSession = () => {
  localStorage.removeItem(
    ADMIN_TOKEN_KEY,
  );

  localStorage.removeItem(
    ADMIN_USER_KEY,
  );
};

/* =========================================================
   EXPORTS
========================================================= */

export {
  ADMIN_TOKEN_KEY,
  ADMIN_USER_KEY,
  saveAdminSession,
  getAdminToken,
  getAdminUser,
  isAdminLoggedIn,
  clearAdminSession,
};