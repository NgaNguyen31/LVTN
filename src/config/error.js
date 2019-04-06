module.exports = app => {

    // Log every request to the console
    if (app.isDebug) {
        const morgan = require('morgan');
        app.use(morgan('dev'));
    }

    app.use(function (req, res) {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            return res.redirect('/404.html');
        }

        // respond with json
        if (req.accepts('json')) {
            return res.send({error: 'Not found!'});
        }
    });
};