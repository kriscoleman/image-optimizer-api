import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as packageJson from '../package.json';
// import * as s3 from 'aws-cdk-lib/aws-s3';

export class OptimizerService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // TODO: add a s3 bucket for storing images globally, which we can later serve from Cloudfront CDN and cache at the edge locations for performance, scalability, and cost savings.
    // const bucket = new s3.Bucket(this, 'ImageStore');

    const handler = new lambda.Function(this, 'ImageOptimizerHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('optimizer-lambda'),
      handler: 'optimizer.main',
      // TODO: add a s3 bucket for storing images globally, which we can later serve from Cloudfront CDN and cache at the edge locations for performance, scalability, and cost savings.
      environment: {
        // BUCKET: bucket.bucketName,
      },
    });

    // TODO: add a s3 bucket for storing images globally, which we can later serve from Cloudfront CDN and cache at the edge locations for performance, scalability, and cost savings.
    // bucket.grantReadWrite(handler);

    const api = new apigateway.RestApi(this, 'optimizer-api', {
      restApiName: packageJson.name,
      description: packageJson.description,
    });

    const optimizeImageIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    });

    api.root.addMethod('GET', optimizeImageIntegration);
  }
}
