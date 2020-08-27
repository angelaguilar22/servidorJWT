const { Router } = require('express');
const router = Router();
// Object of utils
var UtilsInstancia = require('../Utils/Utils');
// INSTANCIA DE CLASE UTILS
const Utils = new UtilsInstancia();

// Main Routes
// END-POINT PARA VERIFICAR CADUCIDAD DE TOKEN
router.get('/verificarToken', async (req, res) => {

    // Varificamos el token
    let response = await Utils.verificacionJWT(req)
    res.send(response)
});


module.exports = router;