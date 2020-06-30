# APIEndPoints_Generator_NodeJS

#### basic crud generator for basic of HTTP requests to build a simple Restful API based on JSON

## HOW TO USE ?


```
{
    "endpoints":[
        {
            "prefix":"api",
            "name":"flash",
            "timestamp":true,
            "c":[
            {
                "name":"active",
                "type":"boolean",
                "db_validations":[{"required":true},{ "unique": true}],
                "joi_validations":["required()","bool()"]
            },
            {
                "name":"work_from",
                "type":"string",
                "validations":[{"required":true}],
                "joi_validations":["number()","string()"]
            },
            {
                "name":"work_to",
                "type":"string",
                "validations":[{"required":true}],
                "joi_validations":["number()","string()"]
            }]
        }
    ]
}
```
##### endpoints for our APIs
###### prefix for route
###### name of model 
###### timestamp (active or not)
###### fields data inisde the the model
----------------------------------
 "name":"active",     
 "type":"boolean",
 "db_validations":[{"required":true},{ "unique": true}], that validation based on Mongodb library
 "joi_validations":["required()","bool()"]    that validation based on Joi library
                
--------------------------------------


