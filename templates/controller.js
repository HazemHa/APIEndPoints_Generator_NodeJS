const { isArray } = require("util");
const fs = require("fs");



const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};



const ControllerTemplateController = {};
ControllerTemplateController.filterAttributes = (jsonObject) => {
  parameters = `{`;
  defineVariables = ``;
  jsonObject.fields.forEach((field, index, array) => {
    //currentProperties += `${field.name}:\n`;

    for (const [key, value] of Object.entries(field)) {
      if (key == "name") {
        defineVariables += `let ${value} = req.body.${value}\n`;

        if (index == 0) {
          parameters += `${value}:${value}\n`;
        } else {
          parameters += `,${value}:${value}`;
        }

        console.log("key, value :", key, value);

        break;
      }
    }
    /*
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
            ///// /*
          }
        }
      }
      
      if (index === array.length - 1) {
        currentProperties += `\n`;
      } else {
        currentProperties += `,\n`;
      }
*/
  });

  parameters += `}`;
  defineVariables += `let data = ${parameters};`;
  // console.log("parameters :",parameters,"defineVariables :",defineVariables)

  return defineVariables;
};

ControllerTemplateController.Template = (jsonObject) => {
  parameters = ControllerTemplateController.filterAttributes(jsonObject);
  capitalizeName = capitalize(jsonObject.name);
  finalFile = `
    const _ = require('lodash');
    const {ObjectID} = require('mongodb');
    const ${capitalizeName} = require('../models/${jsonObject.name}');


    /* POST /${jsonObject.name} */
    exports.post${capitalizeName} = (req, res) => {
        ${parameters}
        const ${jsonObject.name} = new ${capitalizeName}(data);
    
        ${jsonObject.name}.save().then((${jsonObject.name}) => {
            res.json({${jsonObject.name}});
        }, (e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    /* GET /${jsonObject.name} */
    exports.get${capitalizeName} = (req, res) => {    
        ${capitalizeName}.find({}).then((${jsonObject.name}) => {
            res.json({${jsonObject.name}});
        }, (e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    /* GET /${jsonObject.name}/:id */
    exports.get${capitalizeName}ById = (req, res) => {
        const id = req.params.id;    
        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                "errors": {
                    "code": 404,
                    "message": "Sent parameter is invalid"
                }
            });
        }
    
        ${capitalizeName}.findOne({
            _id: id
        }).then((${jsonObject.name}) => {
            if (!${jsonObject.name}) {
                return res.status(404).json({
                    "errors": {
                        "code": 404,
                        "message": "${capitalizeName} not found"
                    }
                });
            }
    
            res.json({${jsonObject.name}});
        }).catch((e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    /* DELETE /${jsonObject.name}/:id */
    exports.delete${capitalizeName}ById = (req, res) => {
        const id = req.params.id;    
        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                "errors": {
                    "code": 404,
                    "message": "Sent parameter is invalid"
                }
            });
        }
    
        ${capitalizeName}.findOneAndRemove({
            _id: id
        }).then((${jsonObject.name}) => {
            if (!${jsonObject.name}) {
                return res.status(404).json({
                    "errors": {
                        "code": 404,
                        "message": "${capitalizeName} not found"
                    }
                });
            }
    
            res.json({${jsonObject.name}});
        }).catch((e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    /* PATCH /${jsonObject.name}/:id */
    exports.update${capitalizeName}ById = (req, res) => {
        const id = req.params.id;
        ${parameters}  
        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                "errors": {
                    "code": 404,
                    "message": "Sent parameter is invalid"
                }
            });
        }
    
        ${capitalizeName}.findOneAndUpdate({
            _id: id
        },{
            $set: data
        },{
            new: true
        }).then((${jsonObject.name}) => {
            if (!${jsonObject.name}) {
                return res.status(404).json({
                    "errors": {
                        "code": 404,
                        "message": "${capitalizeName} not found"
                    }
                });
            }
    
            res.json({${jsonObject.name}});
        }).catch((e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    `;

  fs.writeFileSync(`./src/controllers/${jsonObject.name}.js`, finalFile);
  return `const {${capitalizeName}Controller} = require('./controllers/${jsonObject.name}');`;
  return finalFile;
};

module.exports = ControllerTemplateController;
