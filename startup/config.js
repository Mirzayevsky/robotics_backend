const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('JIDDIY XATO: robtics22_jwtPrivateKey muhit o\'zgaruvchisi aniqlanmagan.');
    }
}
