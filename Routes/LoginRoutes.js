const { Router } = require('express');
const router = Router();
// Object of utils
var UtilsInstancia = require('../Utils/Utils');
// INSTANCIA DE CLASE UTILS
const Utils = new UtilsInstancia();

// END-POINT PARA HACER LOGIN
router.post('/authenticate', (req, res) => {
  console.log(req.body);

  if (req.body.usuario === "root" && req.body.contrasena === "root") {

    let token = Utils.crearToken(req.body);

    res.json({ status: 'ok', mensaje: 'Autenticación exitosa', token: token, user: { NB_USUARIO: req.body.usuario } });

  } else {
    res.json({ status: 'error', mensaje: "Usuario o contraseña incorrectos" })
  }
})

module.exports = router;