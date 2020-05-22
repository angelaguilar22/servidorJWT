const express = require('express');
const app = express();
var nodemailer = require("nodemailer");
var morgan = require('morgan')
var bodyParser = require('body-parser');

//configuration of port of server
app.listen(3002, () => console.log('Aplication run in port 3002'));

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
app.use(bodyParser.urlencoded({limit: '5mb', extended: false }));
app.use(bodyParser.json({limit: '5mb'}));

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
    html: '<p>'+message+'</p>'
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
