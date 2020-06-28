var fs = require("fs");
var contents = fs.readFileSync("EndPoints.json");
var jsonContent = JSON.parse(contents);
var ModelTemplateController = require("./templates/model.js");
var ValidationTemplateController = require("./templates/validation.js");
var RouteTemplateController = require("./templates/route.js");
var ControllerTemplateController = require("./templates/controller.js");


var dirs = ['./src','./src/models','./src/validations','./src/routes/','./src/controllers/']
dirs.forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
});


jsonContent.endpoints.forEach(element => {
    //let finalResult  = ModelTemplateController.Template(element)
    //let finalResult2  = ValidationTemplateController.Template(element)
    let finalResult3  = ControllerTemplateController.Template(element)
   //console.log(finalResult3,"\n")
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