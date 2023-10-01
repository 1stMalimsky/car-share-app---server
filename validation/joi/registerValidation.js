const Joi = require("joi");
const validUrl = require("valid-url")

const registerSchema = Joi.object({
  name: Joi.object()
    .keys({
      firstName: Joi.string().min(2).max(256).required(),
      middleName: Joi.string().min(2).max(256).allow(""),
      lastName: Joi.string().min(2).max(256).required(),
    })
    .required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .regex(
      new RegExp(
        /^(?=(?:[^A-Z]*[A-Z]))(?=(?:[^0-9]*[0-9]){4})(?=.*[-!@#$%^&*_]).{8,}$/
      )
    )
    .required(),
  image: Joi.object().keys({
    url: Joi.string().custom((value, helpers) => {
      if (validUrl.isWebUri(value)) {
        return value;
      } else {
        return helpers.error('any.invalid');
      }
    }),
    alt: Joi.string().min(2).max(256).required(),
  }),
  address: Joi.object()
    .keys({
      state: Joi.string().min(2).max(256).allow(""),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().allow("", 0),
    })
    .required(),
  isAdmin: Joi.boolean().allow(""),
});

const validateRegisterSchema = (userInput) =>
  registerSchema.validateAsync(userInput);

module.exports = {
  validateRegisterSchema,
};
