require("./local/initializeLocalEnv")();

const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const search = require("./routes/search");

const { validateQueryParams } = require("./middleware/validateQueryParams");
const { shouldStartLocalServer, shouldStartMockServer } = require("./local/util");
const { startLocalServer, startMockServer, serveMockImages } = require("./local/server");

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type, Cache-Control, Expires, Pragma");

  next();
};

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
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
