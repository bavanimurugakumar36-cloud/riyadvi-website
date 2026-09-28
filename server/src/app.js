import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import leadRoutes from './routes/leadRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

/* =========================================================
   TRUST PROXY
   ========================================================= */

app.set('trust proxy', 1);

/* =========================================================
   SECURITY HEADERS
   ========================================================= */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
);

/* =========================================================
   CORS
   ========================================================= */

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      /*
       * Allow requests without an Origin header.
       * This includes tools such as curl and PowerShell.
       */
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error('CORS policy: Origin is not allowed.')
      );
    },

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],

    credentials: false,
  })
);

/* =========================================================
   JSON BODY PARSER
   ========================================================= */

app.use(
  express.json({
    limit: '100kb',
  })
);

/* =========================================================
   GLOBAL API RATE LIMITER
   ========================================================= */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      'Too many requests from this IP. Please try again later.',
  },
});

app.use('/api', apiLimiter);

/* =========================================================
   HEALTH CHECK
   ========================================================= */

app.get('/api/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Riyadvi API is running.',
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   LEAD ROUTES
   ========================================================= */

app.use('/api/leads', leadRoutes);

/* =========================================================
   CAREER APPLICATION ROUTES
   ========================================================= */

app.use('/api/applications', applicationRoutes);

/* =========================================================
   ADMIN ROUTES
   ========================================================= */

app.use('/api/admin', adminRoutes);

/* =========================================================
   API 404 HANDLER
   ========================================================= */

app.use('/api/*splat', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint not found.',
  });
});

/* =========================================================
   GLOBAL ERROR HANDLER
   ========================================================= */

app.use((error, req, res, next) => {
  console.error('Server Error:', error);

  /*
   * CORS errors
   */
  if (error.message?.startsWith('CORS policy')) {
    return res.status(403).json({
      success: false,
      message: 'Request blocked by CORS policy.',
    });
  }

  /*
   * Invalid JSON
   */
  if (
    error instanceof SyntaxError &&
    error.status === 400
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request body.',
    });
  }

  /*
   * Generic server error
   */
  return res.status(500).json({
    success: false,
    message: 'Something went wrong on the server.',
  });
});

export default app;