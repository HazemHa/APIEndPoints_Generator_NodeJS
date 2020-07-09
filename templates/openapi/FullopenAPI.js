const fs = require("fs");

const FullopenAPIController = {};

FullopenAPIController.Template = (openAPIGeneralInfo,pathsOpenAPI,componentsOpenAPI) => {
  openAPIGeneralInfo += `\n"paths": {`
pathsOpenAPI.forEach((path, index, array) => {

  if (index === array.length - 1) {
    openAPIGeneralInfo += `${path}`
  } else {
    openAPIGeneralInfo += `${path},`
  }

})

openAPIGeneralInfo += `}`



openAPIGeneralInfo += `,\n"components": {
  "schemas": {`
componentsOpenAPI.forEach((component, index, array) => {

  if (index === array.length - 1) {
    openAPIGeneralInfo += `${component}`
  } else {
    openAPIGeneralInfo += `${component},`
  }
})

openAPIGeneralInfo += `,"ValidationError": {
  "type": "object",
  "properties": {
          "errors": {
          "$ref": "#/components/schemas/ErrorMessage"
            }
  }
},
"NotFound": {
  "type": "object",
  "properties": {
      "errors": {
          "$ref": "#/components/schemas/ErrorMessage"
            }
  }
},
"ErrorMessage": {
  "type": "object",
  "properties": {
      "code": {
          "type": "number",
           "example": 4xx
            },
      "message": {
            "type": "string",
            "example": "Lanesettings not found"
              }
  }
}
}
}`
openAPIGeneralInfo = `{${openAPIGeneralInfo}}`


  

fs.writeFileSync(`./src/openapi/openapi.json`, openAPIGeneralInfo);

};

module.exports = FullopenAPIController;
