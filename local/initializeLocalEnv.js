const { shouldStartLocalServer } = require("./utils/env");

function initializeLocalEnv() {
  if (!shouldStartLocalServer()) return;

  require("dotenv").config({ path: ".env.local" });
}

module.exports = initializeLocalEnv;
