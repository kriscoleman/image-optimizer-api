import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as optimizer_service from '../lib/optimizer-service';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new optimizer_service.OptimizerService(this, 'Optimizer');
  }
}
