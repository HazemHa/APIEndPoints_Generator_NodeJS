const { isArray } = require("util");
const fs = require("fs");


const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};


const ValidationTemplateController = {};

ValidationTemplateController.filterAttributes = (jsonObject) => {
    currentProperties = ``;
    jsonObject.fields.forEach((field, index, array) => {
      currentProperties += `${field.name}:\n`;
      for (const [key, value] of Object.entries(field)) {
        if (key == "name") continue;
        else {
            if (key == "joi_validations" && isArray(value)) {
                let JoiTemplate = `Joi.`

            for (let index = 0; index < value.length; index++) {
                const element = value[index];
                if (index === value.length - 1) {
                    JoiTemplate += `${element}`
                  } else {
                    JoiTemplate += `${element}.`
                  }

                console.log("currentProperties :",JoiTemplate)
            }
            

              currentProperties +=JoiTemplate

/*
            value.forEach((validateRules, index, array) => {
                console.log(`validateRules :${validateRules}`)
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
            */
          }
        }
      }
      if (index === array.length - 1) {
        currentProperties += `\n`;
      } else {
        currentProperties += `,\n`;
      }
    });
  
    return currentProperties;
  };
  
  ValidationTemplateController.Template = (jsonObject) => {
    content = ValidationTemplateController.filterAttributes(jsonObject);
    finalFile = `const Joi = require("@hapi/joi");
    const ${jsonObject.name} = Joi.object({
       ${content}
      });
    
    module.exports = ${jsonObject.name}
      `;
  
    fs.writeFileSync(`./src/validations/${jsonObject.name}.js`, finalFile);
    return finalFile
  };
  

module.exports = ValidationTemplateController;
