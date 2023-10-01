const Joi = require("joi");

const bookedDatesSchema = Joi.object({
    start: Joi.number().min(1111111111111).max(99999999999999).required(),
    end: Joi.number().min(1111111111111).max(99999999999999).required()
})

const validateBookedDatesSchema = (userInput) => {
    return bookedDatesSchema.validateAsync(userInput);
};

module.exports = {
    validateBookedDatesSchema,
};
