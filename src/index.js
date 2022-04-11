"use strict"

const hapi = require("@hapi/hapi");

const indexRoute = require('./routes/index.route');
const appsRoute = require('./routes/apps.route');
const readRoute = require('./routes/read.route');

async function init() {
  const server = hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route( {
    method: "GET",
    path: "/",
    ...indexRoute,
  });
  server.route({
    method: "POST",
    path: "/apps",
    ...appsRoute,
  });
  server.route({
    method: "GET",
    path: "/read",
    ...readRoute,
  });

  await server.start();
  console.log("Hapi Server running on: \n%s", server.info.uri);
}

function reportUnhandledRejection(error) {
  const EXIT_CODE = 1;
  console.error(error);
  process.exit(EXIT_CODE);
}

process.on("unhandledRejection", reportUnhandledRejection);

init();
