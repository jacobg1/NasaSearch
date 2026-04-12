const {
  Stack,
  Duration,
  RemovalPolicy,
  Fn,
  Annotations,
} = require("aws-cdk-lib");
const { Runtime, Function, S3CodeV2 } = require("aws-cdk-lib/aws-lambda");
const { RestApi, LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");
const {
  Bucket,
  BucketEncryption,
  BlockPublicAccess,
} = require("aws-cdk-lib/aws-s3");
const { BucketDeployment, Source } = require("aws-cdk-lib/aws-s3-deployment");
const {
  getAllowHeaders,
  getSSMParam,
  getResourceNames,
  getAllowOrigins,
} = require("./util");

const apiUrl = "/nasa-search/api-url";
const websiteUrl = "/nasa-search/website-url";
const assetPath = "dist";

class SpaceSearchLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const {
      env: { stage },
    } = props;

    const { bucketName, bucketDeploy, functionName, restApiName } =
      getResourceNames(stage);

    const s3Bucket = new Bucket(this, bucketName, {
      bucketName,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      versioned: false,
      enforceSSL: true,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      encryption: BucketEncryption.S3_MANAGED,
    });

    const bucketDeployment = new BucketDeployment(this, bucketDeploy, {
      sources: [Source.asset(assetPath)],
      destinationBucket: s3Bucket,
      extract: false,
    });

    const lambdaFn = new Function(this, functionName, {
      functionName,
      code: S3CodeV2.fromBucketV2(
        s3Bucket,
        Fn.select(0, bucketDeployment.objectKeys),
      ),
      runtime: Runtime.NODEJS_24_X,
      handler: "app.handler",
      memorySize: 128,
      timeout: Duration.seconds(29),
      environment: {
        API_URL: getSSMParam(this, apiUrl),
        NODE_ENV: "production",
      },
    });

    Annotations.of(s3Bucket).acknowledgeWarning(
      "@aws-cdk/aws-lambda:codeFromBucketObjectVersionNotSpecified",
      "Object versioning disabled on source bucket",
    );

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
  }
}

module.exports = { SpaceSearchLambdaStack };
