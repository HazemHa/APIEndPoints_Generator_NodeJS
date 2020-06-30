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
      } else if (key == "content") {
        console.log("value :", value, "\n\n\n");
        currentProperties +=
          ModelTemplateController.filterAttributes(value) + `,`;
        //console.log("checkit :",checkit,"\n\n\n")
        //textOfValues = JSON.stringify(value);
      } else if (key == "enum" && isArray(value)) {
        textOfValues = JSON.stringify(value);
        currentProperties += `${key}: ${textOfValues}\n`;
      } else {
        if (!isArray(value)) {
          currentProperties += `${key}: ${value}\n`;
        } else if (key == "db_validations" && isArray(value)) {
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

ModelTemplateController.Template = (jsonObject) => {
  content = ModelTemplateController.filterAttributes(jsonObject);
  capitalizeName = capitalize(jsonObject.name);
  finalFile = `const mongoose = require("mongoose");

    const Schema = mongoose.Schema;
    mongoose.Promise = require("bluebird");
    
    const ${capitalizeName} = new Schema({
       ${content}
    });
    module.exports = mongoose.model("${capitalizeName}", ${capitalizeName});
    `;

  fs.writeFileSync(`./src/models/${jsonObject.name}.js`, finalFile);

  return `const ${capitalizeName}Model = require('./models/${jsonObject.name}');`;
};

module.exports = ModelTemplateController;
