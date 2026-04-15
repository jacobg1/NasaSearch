const { Fn, Stack, RemovalPolicy } = require("aws-cdk-lib");
const {
  Bucket,
  BucketEncryption,
  BlockPublicAccess,
} = require("aws-cdk-lib/aws-s3");
const { BucketDeployment, Source } = require("aws-cdk-lib/aws-s3-deployment");
const { StringParameter } = require("aws-cdk-lib/aws-ssm");
const { getResourceNames } = require("./util");

const assetPath = "dist";

class SpaceSearchBaseStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    const {
      env: { stage },
    } = props;

    const { bucketName, bucketDeploy, objKeyParam } = getResourceNames(stage);

    const s3Bucket = new Bucket(this, bucketName, {
      bucketName,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      versioned: true,
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

    new StringParameter(this, objKeyParam, {
      parameterName: objKeyParam,
      stringValue: Fn.select(0, bucketDeployment.objectKeys),
    });
  }
}

module.exports = { SpaceSearchBaseStack };
