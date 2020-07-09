const fs = require("fs");
const { isArray } = require("util");

const openAPIComponentsController = {};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

openAPIComponentsController.filterAttributes = (jsonObject) => {
  properties = ``;
  jsonObject.fields.forEach((field, index, array) => {

    
    if (index === array.length - 1) {
      properties += `"${field.name}": {
        "type": "${field.type}"${((field.content) ? `,"required": [${openAPIComponentsController.getAttributes(field.content)}],"properties": {${openAPIComponentsController.filterAttributes(field.content)}}\n` : '')}
      }\n`;
    } else {
      properties += `"${field.name}": {
        "type": "${field.type}"${((field.content) ? `,"required": [${openAPIComponentsController.getAttributes(field.content)}],"properties": {${openAPIComponentsController.filterAttributes(field.content)}}\n` : '')}
      },\n`;
    }

  });
  return properties;
};



openAPIComponentsController.getAttributes = (jsonObject) => {
  attributes = ``;
  jsonObject.fields.forEach((field, index, array) => {


    if (index === array.length - 1) {
      attributes +=`"${field.name}"`
    } else {
      attributes +=`"${field.name}",`
    }


  });
  return attributes;
};

openAPIComponentsController.Template = (jsonObject) => {
  parameters = openAPIComponentsController.filterAttributes(jsonObject);
  schemaName =  capitalize(jsonObject.name).slice(0, -1)
  //let currentPath = `/${jsonObject.prefix}/${jsonObject.name}`;
  let schemasComponent = `
          "${schemaName}": {
            "properties": {
          ${parameters}
            }
          }
            
    `;

  return schemasComponent;
};

module.exports = openAPIComponentsController;
