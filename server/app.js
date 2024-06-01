const express = require('express');
const morgan = require('morgan');

const fileRouter = require('./routes/fileRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/files', fileRouter);

module.exports = app;
