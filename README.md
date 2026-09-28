# Riyadvi Software Technologies — Website Revamp

A premium, futuristic, full-stack corporate website for **Riyadvi Software Technologies**, combining modern React development, immersive 3D experiences, animation, dynamic content architecture, backend APIs, MongoDB, lead generation, career applications, and an administrative dashboard.

## Live Project

- **Website:** https://riyadvi-website-gamma.vercel.app
- **Backend API:** https://riyadvi-website-qcb5.onrender.com
- **API Health:** https://riyadvi-website-qcb5.onrender.com/api/health
- **GitHub:** https://github.com/bavanimurugakumar36-cloud/riyadvi-website

---

## 1. Project Overview

This project is a complete website revamp for Riyadvi Software Technologies.

The objective is to create a premium digital experience that presents Riyadvi as a technology and digital solutions partner while providing clear conversion paths for:

- Service discovery
- Portfolio and case studies
- Company information
- Technology and business content
- Career opportunities
- Contact enquiries
- Business health checkups
- Software project planning
- Personalized project-plan PDF generation
- Job applications
- Administrative lead and application management

The website is implemented as a **dynamic multi-page React application** supported by a separate Express/MongoDB backend.

---

## 2. Key Objectives

The project focuses on:

- Premium and futuristic visual design
- Meaningful 3D experiences
- Interactive scrolling and animation
- Responsive design
- Dynamic service architecture
- Dynamic case-study architecture
- Lead generation
- Backend form processing
- MongoDB persistence
- Secure admin authentication
- Career application management
- Reusable React components
- Route-based code splitting
- Lazy-loaded 3D experiences
- Production deployment

---

## 3. Main Features

### Homepage

The homepage includes:

- Interactive 3D hero experience
- Primary consultation CTA
- Solutions navigation
- Digital transformation journey
- Services preview
- Technology capabilities
- Portfolio preview
- Business/client perspective sections
- Final conversion CTA

**Hero headline:**

> Custom Software & Digital Solutions to Grow Your Business

**Primary CTA:**

> Book a Free Consultation

**Secondary CTA:**

> Explore Our Solutions

### Digital Transformation

The homepage includes a structured transformation journey covering:

```text
Challenge → Strategy → Design → Technology → Launch → Growth
```

The presentation uses scroll-based interaction rather than presenting the process as a static list.

---

## 4. Services

The services section uses reusable, data-driven architecture with individual service routes.

Six core services:

1. Web Development
2. App Development
3. Digital Marketing
4. AR / VR
5. 3D Modeling
6. UI / UX Design

Individual service routes:

```text
/services/web-development
/services/app-development
/services/digital-marketing
/services/ar-vr
/services/3d-modeling
/services/ui-ux-design
```

The service architecture supports reusable sections such as:

- Overview
- Challenges
- Solutions
- Capabilities
- Industries
- Technologies
- Process
- Conversion CTA
- Interactive visual experience

---

## 5. Portfolio & Case Studies

Portfolio content is represented through reusable case-study data and dynamic routes.

### Digital Business Platform

```text
/portfolio/digital-business-platform
```

Technology examples:

- React
- JavaScript
- Node.js
- Express.js
- MongoDB

### Immersive Real Estate Experience

```text
/portfolio/immersive-real-estate-experience
```

Technology examples:

- Three.js
- React Three Fiber
- Drei
- WebGL
- GLTF / GLB

### Growth-Focused Digital Experience

```text
/portfolio/growth-focused-digital-experience
```

Technology examples:

- Google Analytics
- Google Search Console
- Google Ads
- Meta Ads
- SEO Tools

Each case study contains structured information including:

- Project overview
- Business challenge
- Solution
- Services
- Technologies
- Results
- Process
- Interactive presentation

The case-study data is maintained separately from presentation components so additional projects can be added without rebuilding the page structure.

---

## 6. About

The About experience presents:

- Company introduction
- Vision
- Mission
- Values
- Approach
- Technology capabilities
- Interactive visual presentation

The page also includes an immersive 3D experience rather than relying only on static content.

---

## 7. Blog

The blog uses reusable article/page architecture.

Routes:

```text
/blog
/blog/:slug
```

The article architecture is designed so additional articles can be added without rebuilding the page structure.

---

## 8. Careers

The careers section provides:

- Job listings
- Job details
- Position information
- Department
- Location
- Requirements
- Responsibilities
- Application flow

Routes:

```text
/careers
/careers/:slug
```

Applications are submitted to the backend and stored in MongoDB.

The current application model supports:

- Name
- Email
- Phone
- Portfolio URL
- Resume URL
- Cover letter
- Job slug
- Job title
- Department
- Location
- Application status

Resume handling currently uses a **resume URL** rather than a binary file-upload system.

---

## 9. Contact & Lead Generation

The website provides multiple lead-generation experiences using a shared backend lead architecture.

Supported lead types:

```text
contact
health-checkup
project-planning
```

A single `/api/leads` endpoint handles these lead flows using the `leadType` field, avoiding duplicated controllers and keeping validation and persistence in one place.

The backend validates:

- Name
- Email
- Phone
- Company
- Service
- Message
- Lead type

Lead records also have lifecycle statuses:

```text
new
contacted
in-progress
converted
closed
```

### Example Lead Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "company": "Example Company",
  "service": "Web Development",
  "message": "I would like to discuss a project.",
  "leadType": "contact"
}
```

---

## 10. Business Health Checkup

The Business Health Checkup provides a lead-generation experience where users can submit business information for assessment.

The submission uses the shared lead API with:

```text
leadType: health-checkup
```

---

## 11. Software Project Planning Guide

The project planning experience is available at:

```text
/software-project-planning-guide
```

The experience allows users to work through project planning information and generate a personalized project plan.

A PDF is generated on the client side using jsPDF.

The PDF generation code is separately loaded so the main route does not need to load the complete PDF-generation dependency during initial route loading.

---

## 12. Solution Architect

The website also includes a Solution Architect experience:

```text
/solution-architect
```

This provides a structured technology and project-planning experience for users exploring possible software solutions.

---

## 13. 3D & Interactive Experience

3D is a major part of the project rather than being limited to a decorative hero element.

The implementation uses:

- Three.js
- React Three Fiber
- React Three Drei
- WebGL

Interactive 3D experiences are implemented across major areas including:

- Homepage hero
- About experience
- Services experience
- Portfolio/case-study experience

3D scenes are lazy-loaded through reusable scene-loading components.

This prevents every page from loading all 3D dependencies during initial application startup.

---

## 14. Animation & Motion

The project uses:

- GSAP
- ScrollTrigger
- Lenis
- React Three Fiber animation lifecycle

These technologies are used for:

- Scroll-based storytelling
- Section transitions
- Interactive transformations
- Smooth scrolling
- 3D object animation
- Micro-interactions
- Visual state changes

Animation is used to support the user experience rather than being applied uniformly to every element.

### 3D Animation Lifecycle

The floating 3D experience uses React Three Fiber's `useFrame` lifecycle rather than creating a separate `requestAnimationFrame` loop for the same Canvas.

This keeps object animation inside the renderer's existing lifecycle and avoids unnecessary competing animation loops.

---

## 15. Frontend Architecture

The frontend is built with:

- React
- Vite
- JavaScript
- React Router
- CSS Modules

The application follows a reusable component architecture.

Typical structure:

```text
src/
├── components/
├── data/
├── hooks/
├── layouts/
├── pages/
├── sections/
├── services/
├── three/
├── App.jsx
└── main.jsx
```

Page-level and component-level styling is separated using CSS Modules.

---

## 16. Dynamic Routing

The application uses dynamic routes for scalable content.

Examples:

```text
/services/:slug
/portfolio/:slug
/blog/:slug
/careers/:slug
```

This allows reusable page templates to support multiple services, case studies, articles, and jobs.

---

## 17. Backend Architecture

The backend is implemented separately using:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS
- Express Rate Limit
- dotenv

Backend structure:

```text
server/
├── server.js
└── src/
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── adminController.js
    │   ├── applicationController.js
    │   └── leadController.js
    ├── middleware/
    │   └── adminAuth.js
    ├── models/
    │   ├── Application.js
    │   └── Lead.js
    └── routes/
        ├── adminRoutes.js
        ├── applicationRoutes.js
        └── leadRoutes.js
```

---

## 18. Database

MongoDB is used as the persistent application database through Mongoose.

### Database connection

The backend reads the MongoDB connection string from:

```env
MONGODB_URI=your_mongodb_connection_string
```

For local development, a MongoDB Atlas connection string can be used.

For deployment, the production MongoDB connection string is configured as a protected environment variable on the backend hosting platform.

### Collections

The application uses Mongoose models for:

- `Lead`
- `Application`

The collections are created/managed by MongoDB through the Mongoose models when records are persisted.

### Lead Data

Lead records contain:

- Name
- Email
- Phone
- Company
- Service
- Message
- Lead type
- Status
- Created/updated timestamps

### Application Data

Career applications contain:

- Name
- Email
- Phone
- Portfolio
- Resume URL
- Cover letter
- Job reference
- Job title
- Department
- Location
- Application status
- Created/updated timestamps

---

## 19. API

### Health

```http
GET /api/health
```

Production endpoint:

```text
https://riyadvi-website-qcb5.onrender.com/api/health
```

The deployed endpoint currently returns HTTP 200 with:

```json
{
  "success": true,
  "message": "Riyadvi API is running."
}
```

### Leads

```http
POST /api/leads
```

Supported lead types:

```text
contact
health-checkup
project-planning
```

Successful submission returns HTTP 201.

### Applications

```http
POST /api/applications
```

The application API supports:

```text
name
email
phone
portfolio
resumeUrl
coverLetter
jobSlug
jobTitle
department
location
```

### Admin

Admin API functionality includes:

```text
POST   /api/admin/login
GET    /api/admin/verify
GET    /api/admin/dashboard
GET    /api/admin/leads
PATCH  /api/admin/leads/:id/status
GET    /api/admin/applications
PATCH  /api/admin/applications/:id/status
```

Protected admin endpoints require a valid Bearer JWT.

---

## 20. Admin Dashboard

The project includes a basic administrative dashboard.

Admin functionality includes:

- Dashboard statistics
- Lead management
- Lead status updates
- Career application management
- Application status updates
- Authentication
- Protected routes

The dashboard is intended as a lightweight operational interface rather than a full enterprise CRM.

---

## 21. Authentication & Security

Admin authentication uses:

- JWT
- bcryptjs
- Bearer-token authorization
- Environment-based secrets
- Role validation

Required backend environment variables include:

```env
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
JWT_SECRET=your_secure_jwt_secret
```

The password is stored as a bcrypt hash rather than directly in application source code.

Additional backend security includes:

- Helmet security headers
- CORS configuration
- Request rate limiting
- Input validation
- Mongoose validation
- JSON request size controls
- Protected admin routes

---

## 22. Environment Variables

Create:

```text
server/.env
```

Example:

```env
PORT=5000

MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME

FRONTEND_URL=http://localhost:5173

NODE_ENV=development

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
JWT_SECRET=your_secure_jwt_secret
```

Never commit `.env` files or production credentials to Git.

---

## 23. Running Locally

### Frontend

From the project root:

```bash
npm install
npm run dev
```

The Vite development server runs on:

```text
http://localhost:5173
```

### Backend

Open another terminal:

```bash
cd server
npm install
npm run dev
```

The backend normally runs on:

```text
http://localhost:5000
```

---

## 24. Production Build

Create the production frontend build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The project uses Vite production bundling and route-level lazy loading.

The production build was successfully verified before deployment.

---

## 25. Performance

Performance work focused on reducing the initial workload while preserving the intended 3D experience.

### Implemented optimizations

- React lazy loading for route-level code splitting
- Lazy-loaded 3D scenes
- Reusable `ThreeSceneLoader`
- Separate PDF-generation chunk
- Separate html2canvas chunk
- Responsive visual workload
- React Three Fiber animation lifecycle
- Reduced unnecessary animation loops
- CSS Modules for component-level styling

### Verified build output

The production build produced separate chunks for the 3D scenes and planning-guide dependencies.

Examples from the production build:

```text
ProjectPlanningGuide       ~27.81 kB
PDF generator chunk        ~403.16 kB
html2canvas chunk          ~199.49 kB
FloatingGroup vendor       ~907.71 kB
```

The compressed sizes reported by Vite were approximately:

```text
ProjectPlanningGuide       ~8.73 kB gzip
PDF generator chunk        ~131.06 kB gzip
html2canvas chunk          ~46.77 kB gzip
FloatingGroup vendor       ~240 kB gzip
```

The large Three.js vendor chunk is intentionally kept as a lazy-loaded chunk for the current submission. Further vendor splitting is deferred to a later performance pass because the 3D dependency is already separated from normal page loading.

---

## 26. Responsive Design & Mobile 3D

The website is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive behaviour includes:

- Navigation changes
- Mobile menu
- Responsive typography
- Responsive layouts
- Adaptive spacing
- Responsive forms
- Mobile-friendly cards
- Responsive 3D experiences
- Touch-friendly interactions

The 3D experiences are integrated into responsive layouts so they do not control the entire mobile viewport or prevent normal content interaction.

The visual workload is reduced through responsive sizing and layout changes where appropriate.

The implementation does not claim a separate static mobile 3D fallback because that is not part of the current implementation.

---

## 27. Technology Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- CSS Modules
- Axios
- Lucide React
- Inter

### 3D

- Three.js
- React Three Fiber
- React Three Drei
- WebGL

### Animation

- GSAP
- ScrollTrigger
- Lenis

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS
- Express Rate Limit

### PDF

- jsPDF
- html2canvas

---

## 28. Third-Party Assets

The project uses the following external libraries/assets as part of the implementation:

- Inter font through `@fontsource/inter`
- Lucide React icons
- Three.js / React Three Fiber / Drei for WebGL and 3D rendering
- GSAP for animation
- Lenis for smooth scrolling
- jsPDF and html2canvas for client-side PDF generation

Third-party packages are installed through npm and their respective package licenses should be reviewed before redistribution or commercial production use.

The project does not rely on an external 3D model repository as a required runtime service.

---

## 29. AI-Assisted Development

AI tools were used as development assistants for architecture review, implementation guidance, debugging, optimization, documentation, and deployment troubleshooting. AI-generated suggestions were reviewed and adapted manually rather than being used without validation.

### Claude

- **Purpose:** Claude was primarily used for detailed codebase review, frontend implementation support, debugging, code refinement, UI improvements, and reviewing larger React/CSS files.

- **Example Prompt:**

  > Review the existing React/Vite corporate website implementation and identify production-critical issues in the homepage layout, navigation, responsive behaviour, animation lifecycle, 3D rendering, and component structure. Preserve the existing architecture and recommend focused changes rather than unnecessary rewrites. Explain the cause of each issue and provide maintainable implementation changes.

- **What it generated:** Claude provided implementation suggestions and code revisions for frontend layout improvements, CSS refinements, animation behaviour, component cleanup, and debugging approaches.

- **Manual changes:** I integrated the suggestions into the existing component architecture and manually adjusted JSX, CSS Modules, spacing, responsive behaviour, and content presentation. The service data, case-study data, Riyadvi-specific content, layout decisions, and final visual decisions were developed and reviewed manually.

- **Concrete implementation example:** During the 3D rendering review, an independent `requestAnimationFrame` animation loop was identified in the floating 3D component while React Three Fiber was already managing the Canvas rendering lifecycle. I changed the implementation to use React Three Fiber's `useFrame` lifecycle and then tested the 3D scenes and navigation behaviour.

- **Why I chose it:** Claude was useful for reviewing larger files and reasoning about interactions between multiple components while preserving the existing project structure.

### ChatGPT

- **Purpose:** ChatGPT was used for assignment analysis, project architecture planning, debugging, deployment troubleshooting, performance review, API verification, testing strategy, and production-readiness checks.

- **Example Prompt:**

  > Audit this full-stack React website against the interview assignment requirements. Check the routing, frontend architecture, 3D implementation, backend APIs, database integration, responsive behaviour, performance, deployment, Git configuration, and README documentation. Identify only the important gaps and provide focused changes that can be applied without restructuring working functionality unnecessarily.

- **What it generated:** ChatGPT generated implementation plans, debugging approaches, deployment commands, API verification steps, documentation structure, and targeted code changes based on the existing project architecture.

- **Concrete implementation example:** During the final route audit, the assignment required the software planning guide to use `/software-project-planning-guide`, while the application was using `/project-planning-guide`. I identified the mismatch and changed the React route to `/software-project-planning-guide`, then verified the route and ran a successful production build.

- **Manual changes:** I applied and verified the route change myself, tested the production build, checked the deployed backend health endpoint, reviewed the Git state, and manually validated the final website. I also made the final decisions on website content, service data, case-study data, visual design, responsive layouts, and project structure.

- **Why I chose it:** ChatGPT was useful for translating the assignment into an actionable implementation checklist and for checking the project across frontend, backend, deployment, performance, and documentation requirements.

### Human Development & Validation

AI accelerated development, but the final implementation was manually integrated, tested, and validated.

The project-specific content, service and case-study data, layout decisions, visual direction, component integration, debugging, deployment configuration, testing, and final acceptance decisions were performed and reviewed manually.

---

## 30. Git & Version Control

The project is maintained in Git.

Repository:

https://github.com/bavanimurugakumar36-cloud/riyadvi-website

Main branch:

```text
main
```

Typical workflow:

```bash
git status
git add .
git commit -m "feat: update website"
git push origin main
```

Build output, dependencies, environment files, and local archives are excluded through `.gitignore`.

---

## 31. Deployment

### Frontend — Vercel

The React/Vite frontend is deployed using Vercel.

Production URL:

```text
https://riyadvi-website-gamma.vercel.app
```

Typical Vercel configuration:

```text
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

The frontend uses the deployed Render API URL for production backend communication.

### Backend — Render

The Express backend is deployed using Render.

Production URL:

```text
https://riyadvi-website-qcb5.onrender.com
```

The backend is located in the repository's `server` directory.

Typical Render configuration:

```text
Root Directory: server
Build Command: npm install
Start Command: npm start
Branch: main
```

Required production environment variables are configured in Render rather than committed to Git.

### Database

MongoDB is used through Mongoose for persistent storage of:

- Leads
- Career applications

---

## 32. Deployment Verification

The deployed backend was verified using:

```bash
curl.exe -i https://riyadvi-website-qcb5.onrender.com/api/health
```

The production response returned:

```text
HTTP/1.1 200 OK
```

with:

```json
{
  "success": true,
  "message": "Riyadvi API is running."
}
```

This confirms that the deployed Render service is responding successfully.

---

## 33. Current Scope & Limitations

The current implementation prioritizes the core assignment requirements and production-ready foundations.

The following are intentionally lightweight rather than enterprise-level implementations:

- The admin dashboard is a basic lead/application management dashboard.
- Resume submission currently uses a resume URL rather than binary file storage.
- Portfolio content is represented by structured local case-study data.
- Blog content uses reusable frontend data architecture rather than a full external CMS.
- External communication integrations such as email, WhatsApp, and Calendly are not implemented as backend services in the current version.
- Advanced vendor-level Three.js chunk splitting is deferred to a later performance pass.

### Render Free-Tier Cold Start

The backend is deployed on Render's free tier. When the service has been inactive, the platform may put the service to sleep. As a result, the first request after inactivity can take significantly longer than subsequent requests.

---

## 34. Future Improvements

Potential production extensions include:

- Full CMS integration
- Advanced CRM integration
- Email notification workflows
- WhatsApp integration
- Calendly integration
- Cloud-based resume uploads
- Advanced analytics
- SEO metadata automation
- Content management dashboard
- Expanded case-study library
- Automated testing pipeline
- CDN/image optimization
- Further 3D asset optimization
- Monitoring and observability

---

## 35. Development Philosophy

The project was developed around four principles.

### Reusability

Services, case studies, articles, jobs, and administrative features use reusable components and data structures.

### Meaningful Interaction

3D and animation are used to communicate technology, depth, and product experience rather than being purely decorative.

### Production Awareness

The application includes:

- Backend APIs
- Database persistence
- Authentication
- Validation
- Security middleware
- Rate limiting
- Environment configuration
- Deployment
- Code splitting

### Maintainability

The implementation uses:

- Component-based React architecture
- CSS Modules
- Data-driven pages
- Dynamic routes
- Separate frontend/backend responsibilities
- Lazy loading

---

## 36. Final Submission

The project demonstrates a full-stack corporate website experience combining:

- Modern React development
- Dynamic routing
- Reusable architecture
- Three.js / React Three Fiber
- GSAP / ScrollTrigger
- Smooth scrolling
- Responsive UI
- Backend APIs
- MongoDB
- Secure admin authentication
- Lead management
- Career application management
- PDF generation
- AI-assisted development
- Production deployment

The result is intended to provide Riyadvi Software Technologies with a premium, interactive, extensible digital platform rather than a static landing page.
