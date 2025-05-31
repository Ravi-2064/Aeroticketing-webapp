import express from 'express';
import cors from 'cors';
import { initializeDatabase, closeDatabase } from './database/connection';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection
initializeDatabase()
  .then(() => {
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing database connection...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing database connection...');
  await closeDatabase();
  process.exit(0);
}); 