var fs = require("fs");
var contents = fs.readFileSync("EndPoints.json");
var jsonContent = JSON.parse(contents);
var ModelTemplateController = require("./templates/model.js");

var dirs = ['./src','./src/models']
dirs.forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
});




jsonContent.endpoints.forEach(element => {
    let finalResult  = ModelTemplateController.TemplateModel(element.name,element)
   console.log(finalResult,"\n")
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