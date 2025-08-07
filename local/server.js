const express = require("express");
const path = require("path");

const { createMockHandlers } = require("./mockHandlers");

function createMockServer() {
  const { setupServer } = require("msw/node");

  const server = setupServer(...createMockHandlers());
  return server;
}

function startMockServer() {
  const server = createMockServer();

  server.listen();

  server.events.on("request:start", ({ request: { method, url } }) => {
    console.log("Request intercepted", method, url);
  });
}

function serveMockImages(app) {
  const imageFolder = process.env.LOCAL_IMAGE_FOLDER;

  app.use(`/${imageFolder}`, express.static(path.join(__dirname, "mocks/images")));
}

function startLocalServer(app) {
  const port = parseInt(process.env.PORT, 10);
  app.listen(port, () => console.log(`listening on port ${port}! :):)`));
}

module.exports = {
  createMockServer,
  startLocalServer,
  startMockServer,
  serveMockImages,
};
