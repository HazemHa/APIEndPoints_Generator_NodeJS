const fs = require("fs");
const { isArray } = require("util");

const openAPITagsPlusGeneralInfoController = {};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

openAPITagsPlusGeneralInfoController.filterAttributes = (jsonObject) => {
  properties = ``;
  jsonObject.forEach((object, index, array) => {

    
    if (index === array.length - 1) {
      properties += `{
        "name": "${object.name}"
      }`;
    } else {
      properties += `{
        "name": "${object.name}"
      },`;
    }

  });
  return properties;
};



openAPITagsPlusGeneralInfoController.Template = (jsonObject) => {
  parameters = openAPITagsPlusGeneralInfoController.filterAttributes(jsonObject);
  //let currentPath = `/${jsonObject.prefix}/${jsonObject.name}`;
  let schemasComponent = `"openapi": "3.0.0",
  "servers": [
    {
      "description": "SwaggerHub API Auto Mocking",
      "url": "https://virtserver.swaggerhub.com/HazemHa/generatorAPI/1.0.0"
    }
  ],
  "info": {
    "description": "API GENERATOR",
    "version": "1.0.0",
    "title": "API GENERATOR",
    "contact": {
      "email": "hazemhahussain@gmail.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "tags": [${parameters}], `;

  return schemasComponent;
};

module.exports = openAPITagsPlusGeneralInfoController;
