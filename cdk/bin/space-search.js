const { App } = require("aws-cdk-lib");
const { SpaceSearchBaseStack } = require("../lib/base-stack");
const { SpaceSearchApiStack } = require("../lib/api-stack");

const app = new App();

const stage = process.env.STAGE;

if (!stage) {
  throw new Error("Missing stage env var");
}

const opt = {
  env: {
    stage,
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

new SpaceSearchBaseStack(app, `SpaceSearchBaseStack-${stage}`, opt);
new SpaceSearchApiStack(app, `SpaceSearchApiStack-${stage}`, opt);
