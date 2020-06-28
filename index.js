var fs = require("fs");
var contents = fs.readFileSync("EndPoints.json");
var jsonContent = JSON.parse(contents);
var ModelTemplateController = require("./templates/model.js");
var ValidationTemplateController = require("./templates/validation.js");
var RouteTemplateController = require("./templates/route.js");
var ControllerTemplateController = require("./templates/controller.js");
var ServerTemplateController = require("./templates/mainserver.js");


var dirs = ['./src','./src/models','./src/validations','./src/routes/','./src/controllers/']
dirs.forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
});


let routes = []

jsonContent.endpoints.forEach(element => {
    let finalResult  = ModelTemplateController.Template(element)
    let finalResult2  = ValidationTemplateController.Template(element)
    let finalResult3  = ControllerTemplateController.Template(element)
    let finalResult4  = RouteTemplateController.Template(element)
    routes.push(finalResult4)
   //console.log(finalResult3,"\n")
    properties = ``
});

defineRoutes = ``
useRoutes = ``
routes.forEach((model, index, array) => {
  // first format => `const {${capitalizeName}Route} = require('./routes/${jsonObject.name}');`
  // second format =>  app.use("/", routes);
  defineRoutes += `${routes[index][0]}\n`
  useRoutes += `${routes[index][1]}\n`
});


let finalResult5  = ServerTemplateController.Template(defineRoutes,useRoutes)

