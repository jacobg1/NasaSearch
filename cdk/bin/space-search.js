const { App } = require("aws-cdk-lib");
const { SpaceSearchBaseStack } = require("../lib/base-stack");
const { SpaceSearchApiStack } = require("../lib/api-stack");

const app = new App();

const stage = process.env.STAGE;
const event = process.env.npm_lifecycle_event;

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

const eventArray = event.split(":");
const eventName = eventArray[eventArray.length - 1];

if (eventName === "base") {
  new SpaceSearchBaseStack(app, `SpaceSearchBaseStack-${stage}`, opt);
} else {
  new SpaceSearchApiStack(app, `SpaceSearchApiStack-${stage}`, opt);

  // Define other stacks here if needed
}
