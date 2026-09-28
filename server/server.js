import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

/*
 * Atlas DNS workaround for local development only.
 *
 * Do not force custom DNS servers in production.
 */
if (process.env.NODE_ENV !== 'production') {
  dns.setServers([
    '8.8.8.8',
    '1.1.1.1',
  ]);
}

import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = Number(
  process.env.PORT || 5000,
);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(
      PORT,
      '0.0.0.0',
      () => {
        console.log(
          `Riyadvi backend running on port ${PORT}`,
        );

        console.log(
          `Environment: ${
            process.env.NODE_ENV ||
            'development'
          }`,
        );
      },
    );
  } catch (error) {
    console.error(
      'Failed to start Riyadvi backend:',
      error.message,
    );

    process.exit(1);
  }
};

startServer();