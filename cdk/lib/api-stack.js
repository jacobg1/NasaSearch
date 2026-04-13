const { Stack, Duration } = require("aws-cdk-lib");
const { Runtime, Function, S3CodeV2 } = require("aws-cdk-lib/aws-lambda");
const { RestApi, LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");
const { Bucket } = require("aws-cdk-lib/aws-s3");
const {
  getAllowHeaders,
  getSSMParam,
  getResourceNames,
  getAllowOrigins,
  getLatestVersionId,
  getSSMParamValue,
} = require("./util");

const apiUrl = "/nasa-search/api-url";
const websiteUrl = "/nasa-search/website-url";

class SpaceSearchApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    (async () => {
      const {
        env: { stage, region },
      } = props;

      const { bucketName, objKeyParam, functionName, restApiName } =
        getResourceNames(stage);

      const objectKey = await getSSMParamValue(objKeyParam, region);
      const versionId = await getLatestVersionId(bucketName, objectKey, region);

      const s3Bucket = Bucket.fromBucketName(this, bucketName, bucketName);

      const lambdaFn = new Function(this, functionName, {
        functionName,
        code: S3CodeV2.fromBucketV2(s3Bucket, objectKey, {
          objectVersion: versionId,
        }),
        runtime: Runtime.NODEJS_24_X,
        handler: "app.handler",
        timeout: Duration.seconds(29),
        environment: {
          API_URL: getSSMParam(this, apiUrl),
          NODE_ENV: "production",
        },
      });

      const lambdaIntegration = new LambdaIntegration(lambdaFn, {
        allowTestInvoke: false,
      });

      const restApi = new RestApi(this, restApiName, {
        restApiName,
        deployOptions: { stageName: stage },
        defaultIntegration: lambdaIntegration,
        defaultCorsPreflightOptions: {
          allowHeaders: getAllowHeaders(),
          allowOrigins: getAllowOrigins(this, websiteUrl),
        },
      });

      restApi.root.addProxy({ anyMethod: true });
    })();
  }
}

module.exports = { SpaceSearchApiStack };
