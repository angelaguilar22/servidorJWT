const JWT = require('jsonwebtoken');
const JWT_CONFIG = require('../Config/Config');

class Utils {

  // Funcion para crear TOKEN JWT
  crearToken(user) {
    return JWT.sign(user, JWT_CONFIG.JWT_KEY, { expiresIn: 1200 });
  }

  // Funcion para verificar JWT
  verificacionJWT = async (req) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : '';

    try {
      return new Promise((resolver, reject) => {
        JWT.verify(token, JWT_CONFIG.JWT_KEY, (error, tokenSigned) => {

          if (error) {
            resolver({ status: 'error', codeError: 1, message: error })
          } else {
            resolver({ status: 'ok', codeError: 0, message: 'Token valido', user: { NB_USUARIO: tokenSigned.usuario } })
          }
        });
      });
    } catch (err) {
      return { status: 'error', codeError: 1, message: err }
    }
  }

}

module.exports = Utils;