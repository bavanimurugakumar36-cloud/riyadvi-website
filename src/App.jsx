import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import PageLoader from './components/loaders/PageLoader.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute.jsx';
import AdminLayout from './layouts/AdminLayout/AdminLayout.jsx';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Services = lazy(() => import('./pages/Services/Services.jsx'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail/ServiceDetail.jsx'));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio.jsx'));
const CaseStudy = lazy(() => import('./pages/CaseStudy/CaseStudy.jsx'));
const About = lazy(() => import('./pages/About/About.jsx'));
const Blog = lazy(() => import('./pages/Blog/Blog.jsx'));
const BlogArticle = lazy(() => import('./pages/BlogArticle/BlogArticle.jsx'));
const Careers = lazy(() => import('./pages/Careers/Careers.jsx'));
const JobDetails = lazy(() => import('./pages/JobDetails/JobDetails.jsx'));
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'));
const BusinessHealthCheckup = lazy(() => import('./pages/BusinessHealthCheckup/BusinessHealthCheckup.jsx'));
const ProjectPlanningGuide = lazy(() => import('./pages/ProjectPlanningGuide/ProjectPlanningGuide.jsx'));
const SolutionArchitect = lazy(() => import('./pages/SolutionArchitect/SolutionArchitect.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'));

const AdminLogin = lazy(() => import('./pages/AdminLogin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard/AdminDashboard.jsx'));
const AdminLeads = lazy(() => import('./pages/AdminLeads/AdminLeads.jsx'));
const AdminApplications = lazy(() => import('./pages/AdminApplications/AdminApplications.jsx'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<CaseStudy />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<JobDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/business-health-checkup"
              element={<BusinessHealthCheckup />}
            />
            <Route
              path="/solution-architect"
              element={<SolutionArchitect />}
            />
            <Route
              path="/project-planning-guide"
              element={<ProjectPlanningGuide />}
            />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route
                path="/admin/applications"
                element={<AdminApplications />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
