const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDBga ulanish hosil qilindi...');
        });
    mongoose.set('useFindAndModify', false);
}