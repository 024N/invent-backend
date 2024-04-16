import Joi from 'joi';

export const getUsers: any = Joi.object({
  params: Joi.object({}),
  body: Joi.object({}).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true),
});

export const getUser: any = Joi.object({
  params: Joi.object({
    userId: Joi.string().required(),
  }),
  body: Joi.object({}).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true),
});

export const createUser: any = Joi.object({
  params: Joi.object(),
  body: Joi.object({
    name: Joi.string().required(),
  }).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true),
});

export const borrowBook: any = Joi.object({
  params: Joi.object({
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
  }),
  body: Joi.object({}).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true),
});

export const returnBook: any = Joi.object({
  params: Joi.object({
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
  }),
  body: Joi.object({
    score: Joi.number().required(),
  }).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true),
});
