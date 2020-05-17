const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const devEnv = require('./development.config');

const app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Load 'development' configs for dev environment
if (process.env.NODE_ENV !== 'production') {
  devEnv.init();
}

process.env.JWT_KEY = 'thisissecret';

// cors middleware for orign and Headers
app.use(cors());

// Set Bodyparser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'));

// static folder
app.use(express.static(path.join(__dirname, 'public/admin/dist/')));

app.use(express.static(path.join(__dirname, 'public/user/dist/')));

app.use(express.static(path.join(__dirname, 'public/warehouse/dist/')));

// Routes which should handle request
app.all('/admin', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/admin/dist/index.html'));
});

app.all('/user', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/user/dist/index.html'));
});

app.all('/warehouse', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/warehouse/dist/index.html'));
});


// Invalid routes handling middleware
app.use((req, res, next) => {
  const error = new Error('404 not found');
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
