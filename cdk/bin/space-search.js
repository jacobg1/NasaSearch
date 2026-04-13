const { App } = require("aws-cdk-lib");
const { SpaceSearchDeploymentStack } = require("../lib/deployment-stack");
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

new SpaceSearchDeploymentStack(app, `SpaceSearchDeploymentStack-${stage}`, opt);
new SpaceSearchApiStack(app, `SpaceSearchApiStack-${stage}`, opt);
