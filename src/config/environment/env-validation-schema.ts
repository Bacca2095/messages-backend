/* eslint-disable import/namespace */
import * as Joi from '@hapi/joi';

import { NodeEnv } from './node-env.enum';

const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
    .required(),
  APP_PORT: Joi.number().required(),
  TWILIO_ACCOUNT_SID: Joi.string().required(),
  TWILIO_AUTH_TOKEN: Joi.string().required(),
  TWILIO_MESSAGING_SERVICE_SID: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  TYPEORM_LOGGING: Joi.boolean().required(),
  FRONTEND_URL: Joi.string().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
});

export { envValidationSchema };
