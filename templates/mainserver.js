const { isArray } = require("util");
const fs = require("fs");

const ServerTemplateController = {};

ServerTemplateController.filterAttributes = (jsonObject) => {};

ServerTemplateController.Template = (defineRoutes,useRoutes) => {
  finalFile = `

/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');



/**
 * Routes
 */
${defineRoutes}

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
app.set('port', process.env.PORT);
app.use(bodyParser.json());

/**
 * Routes
 */
${useRoutes}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});

module.exports = {app};
`;

  fs.writeFileSync(`./src/index.js`, finalFile);
  return finalFile;
};

module.exports = ServerTemplateController;
