const { S3Client, ListObjectVersionsCommand } = require("@aws-sdk/client-s3");
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");
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
    objKeyParam: `/${appName}/obj-key`,
  };
}

async function getSSMParamValue(name, region) {
  try {
    const client = new SSMClient({ region });
    const command = new GetParameterCommand({
      Name: name,
    });

    const {
      Parameter: { Value },
    } = await client.send(command);
    return Value;
  } catch (err) {
    console.error(err);
    return "";
  }
}

async function getLatestVersionId(bucketName, objectKey, region) {
  try {
    const client = new S3Client({ region });
    const command = new ListObjectVersionsCommand({
      Bucket: bucketName,
      Prefix: objectKey,
    });

    const { Versions } = await client.send(command);
    const { VersionId } = Versions.find(({ IsLatest }) => IsLatest);

    return VersionId;
  } catch (err) {
    console.error(err);
    return "";
  }
}

module.exports = {
  getAllowHeaders,
  getAllowOrigins,
  getLatestVersionId,
  getResourceNames,
  getSSMParam,
  getSSMParamValue,
};
