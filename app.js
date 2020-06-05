const express = require('express');             // Async req/res
const path = require('path');                   
const cookieParser = require('cookie-parser');  // Parse cookie header
const logger = require('morgan');               // Logs requests in console
const cors = require('cors');                   // Express middleware

// Table API routes
const aircoopRouter = require('./routes/aircoop');
const backEndCommissionRouter = require('./routes/backEndCommission');
const frontEndCommissionRouter = require('./routes/frontEndCommission');
const metaExpenseRouter = require('./routes/metaExpense');
const overrideCreationFilterRouter = require('./routes/overrideCreationFilter');

// Create express app and enable cors
const app = express();
app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setup logger and cookies
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set routes
app.use('/aircoop', aircoopRouter);
app.use('/backendcommission', backEndCommissionRouter);
app.use('/frontendcommission', frontEndCommissionRouter);
app.use('/metaexpense', metaExpenseRouter);
app.use('/overridecreationfilter', overrideCreationFilterRouter);

// Catch and handle errors
app.use(async function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page async
  next(err);
});

module.exports = app;