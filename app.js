const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const search = require("./routes/search");

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(search);

// app.listen(port, () => console.log(`listening on port ${port}! :):)`));
module.exports.handler = serverless(app);
