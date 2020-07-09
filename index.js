var fs = require("fs");
var contents = fs.readFileSync("EndPoints.json");

var jsonContent = JSON.parse(contents);
var ModelTemplateController = require("./templates/model.js");
var ValidationTemplateController = require("./templates/validation.js");
var RouteTemplateController = require("./templates/route.js");
var ControllerTemplateController = require("./templates/controller.js");
var ServerTemplateController = require("./templates/mainserver.js");
var ConfigTemplateController = require("./templates/config.js")



var openAPIComponentsController = require("./templates/openapi/components")
var openAPIPathsController = require("./templates/openapi/paths")
var openAPITagsPlusGeneralInfoController = require("./templates/openapi/tagsAndGeneralInfo")
var FullopenAPIController = require("./templates/openapi/FullopenAPI")

var openAPIComponents_2Controller = require("./templates//openapi/components_2")
var dirs = ['./src','./src/models','./src/validations','./src/routes/','./src/controllers/','./src/db','./src/openapi']
dirs.forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
});
let routes = []
let models = []
let componentsOpenAPI = []
let pathsOpenAPI = []


jsonContent.endpoints.forEach(element => {
  let openAPIComponent = openAPIComponentsController.Template(element)
  componentsOpenAPI.push(openAPIComponent)
  let openAPIPathComponent = openAPIPathsController.Template(element)
  pathsOpenAPI.push(openAPIPathComponent)
  

    let modelComponent  = ModelTemplateController.Template(element)
    models.push(modelComponent)
    let ValidationComponent  = ValidationTemplateController.Template(element)
    let ControllerComponent  = ControllerTemplateController.Template(element)
    let RouteComponent  = RouteTemplateController.Template(element)
    routes.push(RouteComponent)
});


let openAPIGeneralInfo = openAPITagsPlusGeneralInfoController.Template(jsonContent.endpoints)
//let fullContent = `{${testt3}${testt2},${testt1}\n}`
//


defineRoutes = ``
useRoutes = ``
useModels = ``
openAPIGeneralInfo = openAPIGeneralInfo
routes.forEach((model, index, array) => {
  // first format => `const {${capitalizeName}Route} = require('./routes/${jsonObject.name}');`
  // second format =>  app.use("/", routes);
  defineRoutes += `${routes[index][0]}\n`
  useRoutes += `${routes[index][1]}\n`
  useModels +=`${models[index]}\n`
});

FullopenAPIController.Template(openAPIGeneralInfo,pathsOpenAPI,componentsOpenAPI)



/*

*/








ConfigTemplateController.Template()
let finalResult5  = ServerTemplateController.Template(defineRoutes,useRoutes,useModels)
/*
*/