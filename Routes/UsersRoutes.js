const { Router } = require('express');
const router = Router();
// Object of utils
var UtilsInstancia = require('../Utils/Utils');
// INSTANCIA DE CLASE UTILS
const Utils = new UtilsInstancia();

// END-POINT PARA HACER LOGIN
router.get('/all', (req, res) => {
  console.log(req.body);

  let user = [
      {user: 'Angel', profile: 'Admin'},
      {user: 'Daniela', profile: 'Admin'},
  ];

  res.json(user);
})

module.exports = router;