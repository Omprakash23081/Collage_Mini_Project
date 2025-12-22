//this file is help during writing controller function it will give schema and controller just import this file and use the validation fildes by using joi.validate function

import Joi from "joi";

//this is used for validation during registration of user
export const registerValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").required(),
  year: Joi.string().valid("year1", "year2", "year3", "year4").optional(),
});

//this is used for validation during login of user and admin also
export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").required(),
});

//this is used for updating name and email any of them or both of them
export const updateProfileValidation = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
});

//this is used for validation during changepassword of user
export const changePasswordValidation = Joi.object({
  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

//this is used for validation during reset password of user
export const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});

//this is used for validate during setNewPassword of user after forget password
export const setNewPasswordValidation = Joi.object({
  newPassword: Joi.string().min(6).required(),
});

//this is used for validatinon during email verifacation of user
export const verifyEmailValidation = Joi.object({
  email: Joi.string().email().required(),
});

//this is used forvalidation during forget password of user
export const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});
