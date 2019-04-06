module.exports = app => {

    // Connect DBs --------------------------------------------------------------------------------
    app.db = require('mongoose');
    app.db.connect(app.mongodb, { useNewUrlParser: true });
    
    // MongoDB connection events ------------------------------------------------------------------
     const connection = app.db.connection;
     connection.on('error', console.error.bind(console, 'The Mongo connection error'));
     connection.once('open', callback => console.log(' - The Mongo connection succeeded.'));

    // Define all models --------------------------------------------------------------------------
    app.model = {};
};