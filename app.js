const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.options('*', cors());
/* Previous cors code before npm install cors --save code ^^
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
var dbConfig = {
  server: 'localhost',
  port: 1433,
  user: 'SA',
  password: 'Password01',
  database: 'Capstone_DB',
  connectionTimeout: 150000,
  driver: 'tedious',
  stream: false,
  options: {
    appName: 'Server',
    encrypt: false
  },
  pool: {
    max: 20,
    min: 0,
    idleTimeoutMillis: 30000
  }
}
*/

/*
  sql.connect(dbConfig).then(pool => {
    return pool.query('select * from Price_AIRCoop')
  }).then(result => {
    // do something with result
    console.dir(result.recordsets);
  }).then(() => {
    return sql.close()
  })
*/


/*
async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(dbConfig)
    const result = await sql.query`select * from Price_AIRCoop`
    console.dir(result)
  } catch (err) {
    console.log("Failed to open a connection to the server");
    console.log(err);
  }
}
*/

/* THIS WORKS
sql.connect(dbConfig).then(pool => {
  if (pool.connecting) {
    console.log("Connecting to the database...");
  }
  if(pool.connected) {
    console.log('Server listnign at port 3000...');
  }
  return pool;
}).catch( function(err) {
  console.log("Failed to open a connection to the server");
  console.log(err);
});
*/

module.exports = app;