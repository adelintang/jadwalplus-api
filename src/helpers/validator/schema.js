import Joi from 'joi';

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const changeUserPasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const scheduleSchema = Joi.object({
  schedule: Joi.string().required(),
  dateTime: Joi.string().required(),
});

export {
  signupSchema,
  signinSchema,
  changeUserPasswordSchema,
  scheduleSchema,
};
