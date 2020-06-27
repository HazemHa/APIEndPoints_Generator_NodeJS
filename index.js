var fs = require("fs");
var contents = fs.readFileSync("EndPoints.json");
var jsonContent = JSON.parse(contents);
var ModelTemplateController = require("./templates/model.js");
var ValidationTemplateController = require("./templates/validation.js");

var dirs = ['./src','./src/models','./src/validations']
dirs.forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
});




jsonContent.endpoints.forEach(element => {
    let finalResult  = ModelTemplateController.TemplateModel(element)
    let finalResult2  = ValidationTemplateController.TemplateModel(element)
   console.log(finalResult2,"\n")
    properties = ``
});

// Get Value from JSON

`    Active: {
  type: Boolean,
  required:true
},
work_from: {
  type: String,
  required:true
},
work_to: {
  type: String,
  required:true
}
});`