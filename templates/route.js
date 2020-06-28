const { isArray } = require("util");
const fs = require("fs");


const RouteTemplateController = {};

RouteTemplateController.filterAttributes = (jsonObject) => {

  };
  
  RouteTemplateController.Template = (jsonObject) => {
    content = RouteTemplateController.filterAttributes(jsonObject);
    finalFile = `
    const routes = require("express").Router(); \n
    const ${capitalizeName}Controller = require('./controllers/${jsonObject.name}'); \n
    routes.post('${jsonObject.prefix}/${jsonObject.name}',  ${capitalizeName}Controller.post${capitalizeName}); // insert new ${jsonObject.name}\n
    routes.get('${jsonObject.prefix}/${jsonObject.name}',  ${capitalizeName}Controller.get${capitalizeName}); // get all ${jsonObject.name}\n
    routes.get('${jsonObject.prefix}/${jsonObject.name}/:id',  ${capitalizeName}Controller.get${capitalizeName}ById); // get ${jsonObject.name} by id\n
    routes.delete('${jsonObject.prefix}/${jsonObject.name}/:id',  ${capitalizeName}Controller.delete${capitalizeName}ById); // delete a ${jsonObject.name} by id\n
    routes.patch('${jsonObject.prefix}/${jsonObject.name}/:id',  ${capitalizeName}Controller.update${capitalizeName}ById); // update a ${jsonObject.name}\n
    module.exports = routes;
`;
  
    fs.writeFileSync(`./src/routes/${jsonObject.name}.js`, finalFile);
    return [`const {${capitalizeName}Route} = require('./routes/${jsonObject.name}');\n`, `app.use("/", ${capitalizeName}Route);\n`]
  };

  

module.exports = RouteTemplateController;
