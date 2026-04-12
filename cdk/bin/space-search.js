const { App } = require("aws-cdk-lib");
const { SpaceSearchLambdaStack } = require("../lib/space-search-stack");

const app = new App();

const stage = process.env.STAGE;

if (!stage) {
  throw new Error("Missing stage env var");
}

new SpaceSearchLambdaStack(app, `SpaceSearchLambdaStack-${stage}`, {
  env: {
    stage,
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();
