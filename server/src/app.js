const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const leadRoutes = require('./routes/leadRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

/* ========================================
   SECURITY
======================================== */

app.use(helmet());

/* ========================================
   CORS
======================================== */

const allowedOrigins = [
  'https://riyadvi-website-gamma.vercel.app',
  'https://www.riyadvisoftwaretechnologies.com',
  'https://riyadvisoftwaretechnologies.com',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // such as server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('CORS blocked origin:', origin);

      return callback(
        new Error('Not allowed by CORS')
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

    credentials: true,

    optionsSuccessStatus: 204,
  })
);

/* ========================================
   BODY PARSING
======================================== */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* ========================================
   RATE LIMIT
======================================== */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

app.use('/api', apiLimiter);

/* ========================================
   HEALTH CHECK
======================================== */

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Riyadvi backend is running',
  });
});

/* ========================================
   API ROUTES
======================================== */

app.use('/api/leads', leadRoutes);

app.use('/api/applications', applicationRoutes);

app.use('/api/admin', adminRoutes);

/* ========================================
   404
======================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/* ========================================
   ERROR HANDLER
======================================== */

app.use((err, req, res, next) => {
  console.error('Server error:', err);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS origin not allowed',
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || 'Internal server error',
  });
});

module.exports = app;