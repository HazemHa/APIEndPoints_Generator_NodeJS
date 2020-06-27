const Joi = require("@hapi/joi");

const flash = Joi.object({
  active: Joi.required().bool(),
  work_from: Joi.number().string(),
  work_to: Joi.number().string(),
});

module.exports = flash;
