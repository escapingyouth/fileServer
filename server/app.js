const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const fileRouter = require('./routes/fileRoutes');
const userRouter = require('./routes/userRoutes');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour',
});

app.use('/api', limiter);

const allowedOrigins = [
  'http://localhost:5173',
  'http://another-allowed-origin.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (cross-site scripting)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use('/api/files', fileRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
