require("./local/initializeLocalEnv")();

const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const { json } = require("body-parser");
const serverless = require("serverless-http");
const search = require("./routes/search");

const { validateQueryParams } = require("./middleware/validateQueryParams");
const { allowCrossDomain } = require("./middleware/crossDomain");
const {
  shouldStartLocalServer,
  shouldStartMockServer,
} = require("./local/utils/env");
const {
  startLocalServer,
  startMockServer,
  serveMockImages,
} = require("./local/server");

app.use(compression());
app.use(helmet());
app.use(json());
app.use(allowCrossDomain);
app.use(validateQueryParams);
app.use(search);

if (shouldStartMockServer()) {
  serveMockImages(app);
  startMockServer();
}

if (shouldStartLocalServer()) {
  startLocalServer(app);
}

module.exports.handler = serverless(app);
