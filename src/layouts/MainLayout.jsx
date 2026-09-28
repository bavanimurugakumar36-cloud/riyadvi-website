import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import useLenis from '../hooks/useLenis';

import styles from './MainLayout.module.css';

function MainLayout() {
  const { pathname } = useLocation();

  useLenis(pathname);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;