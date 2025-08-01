function shouldStartLocalServer() {
  return process.env.ENV === "local" || process.env.ENV === "mocks";
}

function shouldStartMockServer() {
  return process.env.ENV === "mocks";
}

module.exports = { shouldStartLocalServer, shouldStartMockServer };
