const JWT = require('jsonwebtoken');
const JWT_CONFIG = require('../Config/Config');

class Utils {

  // Funcion para crear TOKEN JWT
  crearToken(user){
    return JWT.sign(user, JWT_CONFIG.JWT_KEY, {expiresIn: 1200});
  }

  // Funcion para verificar JWT
  verificacionJWT = async (token) => {

    try {
      return new Promise((resolver, reject) => {
        JWT.verify(token, JWT_CONFIG.JWT_KEY, (error, tokenSigned) => {
         
         if(error){
           resolver({status: 'error', message: error})
         }else{  
           resolver({status: 'ok', message: tokenSigned})
         }
       });
      });
    }catch(err){
      return {status: 'error', message: err}
    }
  }

}

module.exports = Utils;