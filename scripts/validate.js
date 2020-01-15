const Joi = require("@hapi/joi");

function validate(body) {
    const schema = Joi.object({
      description: Joi.string()
        .min(5)
        .required(),
      done: Joi.boolean(),
      date: Joi.date()
    });
  
    return schema.validate(body);
}

module.exports = validate;