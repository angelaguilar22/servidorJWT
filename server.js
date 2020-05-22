const express = require('express');
const app = express();
var nodemailer = require("nodemailer");
var morgan = require('morgan')
var bodyParser = require('body-parser');

// require of config of JWT key
var JWT = require('jsonwebtoken');
var JWT_CONFIG = require('./Config/Config');
const protegerRutas = express.Router();
var UtilsInstancia = require('./Utils/Utils');

// SET configuration of JWT 
app.set('llave', JWT_CONFIG.JWT_KEY);

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

// INSTANCIA DE CLASE UTILS
const Utils = new UtilsInstancia();

// Configuracion de middleware para validar token para endpoints
protegerRutas.use((req, res, next) => {
  const token = req.headers['authorization'];

  console.log(token);
  let bearerToken = token.split(' ');

  if (bearerToken[1]) {
    JWT.verify(bearerToken[1], app.get('llave'), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
        req.decoded = decoded;
        next();
        console.log(decoded);
      }
    });
  } else {
    res.send({ mensaje: 'Token no proveída.' });
  }

});

// START SERVIDOR configuration of port of server
app.listen(3002, () => console.log('Aplication run in port 3002'));


/* Routes of Server */
app.post('/', (req, res) => {
  let email = req.body.email;
  let title = req.body.title;
  let message = req.body.message;
  let subject = req.body.subject;

  //Configuration of metod of mail and user
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'angelaguilarmartinez19@gmail.com',
      pass: '123456789trexer'
    }
  });

  //get message

  //console.log(req.body);
  //config send and destination user
  var mailOptions = {
    from: 'angelaguilarmartinez19@gmail.com',
    to: email,
    subject: subject,
    tex: 'Esto es una prueba del envio de un correo',
    html: '<p>' + message + '</p>'
  }

  //send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error, 'ha habido un error');
    } else {
      alert("Se ha enviado el correo");
    }
  });

  //send response of consume endpoint
  res.send({ status: 'ok', message: 'Correo enviado correctamente' });
});



app.get('/prueba', protegerRutas, (req, res) => {
  res.send({ status: 'ok' });
});

app.post('/autenticar', (req, res) => {
  console.log(req.body);

  if (req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
    const payload = {
      username: req.body.usuario,
      constraseña: req.body.contrasena
    };

    const token = JWT.sign(payload, app.get('llave'), {expiresIn: 1440});

    res.json({mensaje: 'Autenticación correcta',token: token});
    
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" })
  }
})

app.get('/verificarToken', async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];

  let response = await Utils.verificacionJWT(JWT, token)
  res.send(response)
});