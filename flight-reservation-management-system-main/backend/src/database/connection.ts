import { DataSource } from 'typeorm';
import { databaseConfig } from '../config/database';

// Create a new DataSource instance
export const AppDataSource = new DataSource(databaseConfig);

// Initialize database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
};

// Close database connection
export const closeDatabase = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Database connection closed successfully');
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
}; 