const fs = require("fs");
const { isArray } = require("util");

var openAPIComponentsController = require("./templates/openapi/components")
var openAPIPathsController = require("./templates/openapi/paths")
var openAPITagsPlusGeneralInfoController = require("./templates/openapi/tagsAndGeneralInfo")


const openAPITemplateController = {};


openAPITemplateController.filterAttributes = (jsonObject) => {
    let testt1 = openAPIComponentsController.Template(element)
    let testt2 = openAPIPathsController.Template(element)
    let testt3 = openAPITagsPlusGeneralInfoController.Template(jsonContent.endpoints)
    let fullContent = `{${testt3}${testt2},${testt1}\n}`
  

  return properties;
};




openAPITemplateController.Template = (jsonObject) => {
  parameters = openAPIComponentsController.filterAttributes(jsonObject);
  schemaName =  capitalize(jsonObject.name).slice(0, -1)
  //let currentPath = `/${jsonObject.prefix}/${jsonObject.name}`;
  let schemasComponent = ''

  return schemasComponent;
};

module.exports = openAPIComponentsController;
