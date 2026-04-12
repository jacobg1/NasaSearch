const { StringParameter } = require("aws-cdk-lib/aws-ssm");

function getSSMParam(stack, name) {
  return StringParameter.valueForStringParameter(stack, name);
}

function getName(stage) {
  return `space-search-${stage}`;
}

function getAllowHeaders() {
  return ["Content-Type", "Cache-Control", "Expires", "Pragma"];
}

function getAllowOrigins(stack, paramName) {
  return [getSSMParam(stack, paramName)];
}

function getResourceNames(stage) {
  const appName = getName(stage);

  const bucketName = `${appName}-bucket`;

  return {
    bucketName,
    bucketDeploy: `${bucketName}-deployment`,
    functionName: `${appName}-function`,
    restApiName: `${appName}-api`,
  };
}

module.exports = {
  getAllowHeaders,
  getAllowOrigins,
  getResourceNames,
  getSSMParam,
};
