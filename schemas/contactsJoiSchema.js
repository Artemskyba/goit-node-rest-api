const Joi = require("joi");

const contactJoiSchema = Joi.object({
  name: Joi.string().max(15).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
  favorite: Joi.boolean(),
});

const updateJoiSchema = Joi.object({
  name: Joi.string().max(15),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
});

const updateStatusJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactJoiSchema, updateJoiSchema, updateStatusJoiSchema };
