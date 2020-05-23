const express = require('express');
const app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');

// Object of utils
var UtilsInstancia = require('./Utils/Utils');
// INSTANCIA DE CLASE UTILS
const Utils = new UtilsInstancia();

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

// START SERVIDOR configuration of port of server
app.listen(3002, () => console.log('Aplication run in port 3002'));


/*-------------------------------------------------- ROUTES OF SERVER -------------------------------------------------- */

// END-POINT PARA HACER LOGIN
app.post('/login', (req, res) => {
  console.log(req.body);

  if (req.body.usuario === "root" && req.body.contrasena === "root") {

    let token = Utils.crearToken(req.body);

    res.json({status: 'ok', mensaje: 'Autenticación correcta',token: token});

  } else {
    res.json({status: 'error', mensaje: "Usuario o contraseña incorrectos" })
  }
})


// END-POINT PARA VERIFICAR CADUCIDAD DE TOKEN
app.get('/verificarToken', async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];

  console.log(token);
  let response = await Utils.verificacionJWT(token)
  res.send(response)
});