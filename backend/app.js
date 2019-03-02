const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var iterationsRouter = require('./routes/iterations');

var app = express();

//DB connection
mongoose.connect('mongodb://localhost/scrumController', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
	.catch(error => console.error(error.message));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Morgan setup
if (app.get('env') === 'development'){
  app.use(morgan('dev'));
  console.log('Morgan enabled...');
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/project', iterationsRouter);

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

module.exports = app;
