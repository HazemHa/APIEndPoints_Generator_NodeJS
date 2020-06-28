const mongoose = require('mongoose');
    require('dotenv').config();
    const datebase = () => {
        //db info
        
        const dbUrl = process.env.DB_URL;
        const dbPort = process.env.DB_PORT;
        const datebase = process.env.DB_NAME;
    
        // mongoose connect
        mongoose.connect(`mongodb://${dbUrl}:${dbPort}/${datebase}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true});
        // if mongoose runs
        mongoose.connection.on('open', () => {
            console.log('Mongodb Connected');
    
    
        });
        // if mongoose doesn't runs
        mongoose.connection.on('error', (error) => {
            console.log(`Mongoose error: ${error}`);
        });
    
        mongoose.Promise = global.Promise;
    }
    
    module.exports =  datebase();