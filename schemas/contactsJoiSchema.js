import Joi from "joi";

export const contactJoiSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

export const updateJoiSchema = Joi.object({
  name: Joi.string().max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
});

export const updateStatusJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
