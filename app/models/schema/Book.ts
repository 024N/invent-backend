import Joi from 'joi';

// Joi schema for getting a single book by ID
export const getBook: any = Joi.object({
  params: Joi.object({
    bookId: Joi.string().required(),
  }),
  body: Joi.object({}).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true),
});

// Joi schema for getting all books
export const getBooks: any = Joi.object({
  params: Joi.object({}),
  body: Joi.object({}).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true),
});

// Joi schema for creating a new book
export const createBook: any = Joi.object({
  params: Joi.object(),
  body: Joi.object({
    name: Joi.string().required(),
  }).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true),
});
