const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(db)
  .then(() => console.log('Database connection successful'))
  .catch((error) => console.error('Database connection error:', error));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}... `);
});

// Used to handle unhandled promise rejections globally in the application.
process.on('unhandledRejection', (error) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(error.name, error.message);

  server.close(() => process.exit(1));

  // Forcefully shut down the server in 10 seconds if it hasn't closed
  setTimeout(() => {
    console.error('Forcibly shutting down...');

    process.exit(1);
  }, 10000);
});

// Used to handle synchronous exceptions that are not caught anywhere else in the code
// It does not catch asynchronous errors
process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(error.name, error.message);

  server.close(() => process.exit(1));
});
