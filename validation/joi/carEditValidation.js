const Joi = require("joi");
const validUrl = require('valid-url');

const validateURL = (value) => {
  if (validUrl.isWebUri(value)) {
    return value;
  } else {
    return null;
  }
};

const createCarSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  carType: Joi.string().min(2).max(1024).required(),
  carModel: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  url: Joi.string().custom(validateURL).required(),
  alt: Joi.string().min(2).max(256),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(1).required(),
  zip: Joi.number().allow("", 0),
  price: Joi.string().min(2).max(99999).required(),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
});

const validateEditCarSchema = (userInput) => {
  return createCarSchema.validateAsync(userInput);
};

module.exports = {
  validateEditCarSchema,
};
