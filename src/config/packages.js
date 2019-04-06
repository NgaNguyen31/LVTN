module.exports = (app, http) => {

    // Get information from html forms
    const bodyParser = require('body-parser');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    // Cryptography
    app.crypt = require('bcrypt-nodejs');
    app.getToken = length => Array(length).fill('~!@#$%^&*()0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').map(x => x[Math.floor(Math.random() * x.length)]).join('');
    // app.sha256 = require('crypto-js/sha256');

    // Configure session
    const session = require('express-session');
    app.set('trust proxy', 1); // trust first proxy
    app.use(session({
        secret: 'jkhls#$$dufuq23rkjlndspj98ucafjklwermkl$*(@io879809270r!',
        key: 'ntt',
        resave: true,
        saveUninitialized: true
    }));

    // Read cookies (needed for auth)
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());

    // Multi upload
    const multiparty = require('multiparty');
    app.getUploadForm = () => new multiparty.Form({ uploadDir: app.uploadPath });

    // Image processing library
    app.jimp = require('jimp');

    // Libraries
    require('./lib/string')(app);
    require('./lib/date')(app);
    require('./lib/email')(app);
    require('./lib/excel')(app);
    require('./lib/schedule')(app);
};