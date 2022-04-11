const Joi = require('joi')

const validationSchema =  Joi.object({
  apps: Joi.array().items(Joi.number()),
});

async function appsRouteHandler(request, h) {
  return h.response({
    "numberOfApps": request?.payload?.apps?.length ?? 0,
  }).type("text/json").code(200);
}

module.exports = {
  handler: appsRouteHandler,
  options: {
    auth: false,
    validate: {
      payload: validationSchema
    }
  }
};
