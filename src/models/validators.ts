import Joi from 'joi';

export const idValidator = Joi.string().length(36).message('Id length must be 36 characters long');
export const nameValidator = Joi.string().min(3).message('Name length must be at least 3 characters long');
