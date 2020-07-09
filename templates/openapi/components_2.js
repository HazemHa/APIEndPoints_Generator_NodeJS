const fs = require("fs");
const { isArray } = require("util");

const openAPIComponents_2Controller = {};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};



openAPIComponents_2Controller.filterAttributes = (jsonObject) => {
  currentProperties = ``;
  jsonObject.fields.forEach((field, index, array) => {
    currentProperties += `${field.name}:{\n`;
    for (const [key, value] of Object.entries(field)) {
      if (key == "name") continue;
      if (key == "type") {
        capitalizeType = capitalize(value);
        currentProperties += `${key}:${capitalizeType},\n`;
      } else if (key == "content") {
        currentProperties +=
        openAPIComponents_2Controller.filterAttributes(value) + `,`;
        //console.log("checkit :",checkit,"\n\n\n")
        //textOfValues = JSON.stringify(value);
      } else if (key == "enum" && isArray(value)) {
        textOfValues = JSON.stringify(value);
        currentProperties += `${key}: ${textOfValues}\n`;
      } else {
        if (!isArray(value)) {
          currentProperties += `${key}: ${value}\n`;
        }
      }
    }
    if (index === array.length - 1) {
      currentProperties += `}\n`;
    } else {
      currentProperties += `},\n`;
    }
  });

  return currentProperties;
};

openAPIComponents_2Controller.Template = (jsonObject) => {
  parameters = openAPIComponents_2Controller.filterAttributes(jsonObject);
  let currentPath = `/${jsonObject.prefix}/${jsonObject.name}`;
  /*
  let schemasComponent = `{
    "components": {
        "schemas": {
          "ActivationKey": {
            "type": "object",
            "required": [
              "signature",
              "message",
              "key",
              "last_update"
            ],
            "properties": {
              "${attribute}": {
                "type": "${attributeType}",
              },
              "message": {
                "type": "string",
              },
              "key": {
                "type": "string",
              },
              "last_update": {
                "type": "number",
              }
            }
          },
        }
      }
}`;
  return schemasComponent;
  */
};

module.exports = openAPIComponents_2Controller;
