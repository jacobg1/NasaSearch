const { shouldStartMockServer } = require("../local/utils/env");

function getAllowOrigin() {
  const origin = process.env.WEBSITE_URL;

  if (!origin || origin === "*") {
    throw new Error("Invalid origin");
  }

  return origin;
}

function getAllowMethods() {
  return "GET";
}

function getAllowHeaders() {
  return "Content-Type, Cache-Control, Expires, Pragma";
}

function allowCrossDomain(_, res, next) {
  res.header("Access-Control-Allow-Origin", getAllowOrigin());
  res.header("Access-Control-Allow-Methods", getAllowMethods());
  res.header("Access-Control-Allow-Headers", getAllowHeaders());

  if (shouldStartMockServer()) {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
  }

  next();
}

module.exports = { allowCrossDomain };
