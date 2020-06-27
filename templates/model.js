const { type } = require("os");
const { isArray } = require("util");
const fs = require("fs");

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const ModelTemplateController = {};

ModelTemplateController.filterAttributes = (jsonObject) => {
  currentProperties = ``;
  jsonObject.fields.forEach((field, index, array) => {
    currentProperties += `${field.name}:{\n`;
    for (const [key, value] of Object.entries(field)) {
      if (key == "name") continue;
      if (key == "type") {
        capitalizeType = capitalize(value);
        currentProperties += `${key}:${capitalizeType},\n`;
      } else if (key == "enum" && isArray(value)) {
        textOfValues = JSON.stringify(value);
        currentProperties += `${key}: ${textOfValues}\n`;
      } else {
        if (!isArray(value)) {
          currentProperties += `${key}: ${value}\n`;
        } else if (key == "validations" && isArray(value)) {
          value.forEach((validateRules, index, array) => {
            for (const [validateKey, validate] of Object.entries(
              validateRules
            )) {
              if (index === array.length - 1) {
                currentProperties += `${validateKey}:${validate}\n`;
              } else {
                currentProperties += `${validateKey}:${validate},\n`;
              }
            }
          });
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

ModelTemplateController.TemplateModel = (modelName, jsonObject) => {
  content = ModelTemplateController.filterAttributes(jsonObject);
  finalFile = `const mongoose = require("mongoose");

    const Schema = mongoose.Schema;
    mongoose.Promise = require("bluebird");
    
    const ${modelName} = new Schema({
       ${content}
    });
    module.exports = mongoose.model("${modelName}", ${modelName});
    `;

  fs.writeFileSync(`./src/models/${modelName}.js`, finalFile);
};

module.exports = ModelTemplateController;
