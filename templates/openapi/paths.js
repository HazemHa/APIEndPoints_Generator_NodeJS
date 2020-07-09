const fs = require("fs");

const openAPIPathsController = {};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};


openAPIPathsController.Template = (jsonObject) => {
  currentPath = `/${jsonObject.prefix}/${jsonObject.name}`
  schemaName =  capitalize(jsonObject.name).slice(0, -1)

  let PathComponent = `
   
      "${currentPath}": {
        "get": {
          "tags": [
            "${jsonObject.name}"
          ],
          "summary": "Get array of ${jsonObject.name}",
          "description": "Return all Objects of ${jsonObject.name}"\n,
          "parameters": [],
          "responses": {
            "200": {
              "description": "Return an array of ${jsonObject.name} model",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "$ref": "#/components/schemas/${schemaName}"
                    }
                }
                }
              }
            },
            "400": {
              "description": "Sent parameter is invalid",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/ValidationError"
                  }
                }
              }
            },
            "404": {
              "description": " Data not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/NotFound"
                  }
                }
              }
            }
          }
        }
      },
      "/api/${jsonObject.name}/:id": {
        "get": {
          "tags": [
            "${jsonObject.name}"
          ],
          "summary": "Get ${jsonObject.name} By ID",
          "description": "Return a Object of ${schemaName}"\n,
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "pass an id of object",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return an object of ${jsonObject.name} model",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/${schemaName}"
                  }
                }
              }
            },
            "400": {
              "description": "Sent parameter is invalid",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/ValidationError"
                  }
                }
              }
            },
            "404": {
              "description": " Data not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/NotFound"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "tags": [
            "${jsonObject.name}"
          ],
          "summary": "Get ${jsonObject.name} By ID",
          "description": "Return a Object of ${schemaName}"\n,
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "pass an id of object",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return an object of ${jsonObject.name} model",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/${schemaName}"
                  }
                }
              }
            },
            "400": {
              "description": "Sent parameter is invalid",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/ValidationError"
                  }
                }
              }
            },
            "404": {
              "description": " Data not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/NotFound"
                  }
                }
              }
            }
          }
        },
        "put": {
          "tags": [
            "${jsonObject.name}"
          ],
          "summary": "Get ${jsonObject.name} By ID",
          "description": "Return a Object of ${schemaName}"\n,
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "pass an id of object",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/${schemaName}"
                }
              }
            },
            "description": "${jsonObject.name} item to add"
          },
          "responses": {
            "200": {
              "description": "Return an object of ${jsonObject.name} model",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/${schemaName}"
                  }
                }
              }
            },
            "400": {
              "description": "Sent parameter is invalid",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/ValidationError"
                  }
                }
              }
            },
            "404": {
              "description": " Data not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/NotFound"
                  }
                }
              }
            }
          }
        }
      },
      "/${jsonObject.name}": {
        "post": {
          "tags": [
            "${jsonObject.name}"
          ],
          "summary": "adds an activation item",
          "description": "Adds an activation key to the system",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/${schemaName}"
                }
              }
            },
            "description": "${schemaName} item to add"
          },
          "responses": {
            "200": {
              "description": "Return an object of ${jsonObject.name} model",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/${schemaName}"
                  }
                }
              }
            },
            "201": {
              "description": "item created"
            },
            "400": {
              "description": "invalid input, object invalid"
            },
            "409": {
              "description": "an existing item already exists"
            }
          }
        }
      }  
  `;

  return PathComponent;
};

module.exports = openAPIPathsController;
