const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: environment variable robtics22_jwtPrivateKey is not defined.');
    }
}
