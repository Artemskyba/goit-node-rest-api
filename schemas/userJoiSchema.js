import Joi from "joi";

export const registerJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { deny: ["ru", "su"] },
    })
    .required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

export const loginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { deny: ["ru", "su"] },
    })
    .required(),
});

export const emailJoiSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { deny: ["ru", "su"] },
  }),
});
