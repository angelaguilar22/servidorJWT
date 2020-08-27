const express = require('express');
const app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');
const path = require('path');

//configuration of morgan logs
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-CSRF-Token, Authorization');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Configuracion de bodyparse to response of service
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

// STATIC´S FILES 
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/api/token', require('./Routes/MainRoutes'));
app.use('/api/login', require('./Routes/LoginRoutes'));
app.use('/api/users', require('./Routes/UsersRoutes'));
// START SERVIDOR
app.listen(3002, () => console.log('Aplication run in port 3002')); 