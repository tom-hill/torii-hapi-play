function indexRouteHandler(request, h) {
  return h.response("Hello world!");
}

module.exports = {
  handler: indexRouteHandler,
};
