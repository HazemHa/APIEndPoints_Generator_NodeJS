

/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
var database = require("./db/mongodb")


/**
 * Models
 */
const FlashModel = require('./models/flash');




/**
 * Routes
 */
const FlashRoute = require('./routes/flash');



/**
 * Middlewares
 */

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', 3002);
app.use(bodyParser.json());

/**
 * Routes
 */
app.use("/", FlashRoute);



/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});

module.exports = {app};
