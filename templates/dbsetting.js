const fs = require("fs");




const DBSettingTemplateController = {};

  DBSettingTemplateController.Template = () => {

    finalFile = `const mongoose = require('mongoose');
    require('dotenv').config();
    const datebase = () => {
        //db info
        
        const dbUrl = process.env.DB_URL;
        const dbPort = process.env.DB_PORT;
        const datebase = process.env.DB_NAME;
    
        // mongoose connect
        mongoose.connect(\`mongodb://\${dbUrl}:\${dbPort}/\${datebase}\`, {
            useNewUrlParser: true,
            useUnifiedTopology: true});
        // if mongoose runs
        mongoose.connection.on('open', () => {
            console.log('Mongodb Connected');
    
    
        });
        // if mongoose doesn't runs
        mongoose.connection.on('error', (error) => {
            console.log(\`Mongoose error: \${error}\`);
        });
    
        mongoose.Promise = global.Promise;
    }
    
    module.exports =  datebase();`;


    let envFile = `DB_URL ="localhost"
    DB_PORT =27017
    DB_NAME ="sensorDB"
    IP_DEVICE = "127.0.0.1"`
  
    fs.writeFileSync(`./src/db/mongodb.js`, finalFile);
    fs.writeFileSync(`./src/.env`, envFile);
    return `const ${capitalizeName}Controller = require('./db/mongodb');`
    return finalFile
  };

  

module.exports = DBSettingTemplateController;
