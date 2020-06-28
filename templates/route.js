const { isArray } = require("util");
const fs = require("fs");


const ValidationTemplateController = {};

ValidationTemplateController.filterAttributes = (jsonObject) => {

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
