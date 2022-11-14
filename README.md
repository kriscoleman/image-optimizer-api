# image-optimizer-api

An serverless api for optimizing images

It uses sharp (a popular npm package which uses libvips to reliably resize/optimize images) to optimize a dataUrl or http url image to reduce file size.

In order to provide the optimization as a service that customers can consume in their <img/> html tags, this project follows an infrastructure-as-code strategy to wrap this optimizer in a rest api.

The rest api is implemented as a serverless lambda function behind a API gateway, written in AWK CDK.

## How to use the Rest API service once deployed

`curl -X GET 'https://{GUID}.execute-api.{REGION}.amazonaws.com/prod/web/{yourDesiredImageName}.{yourDesiredFileExtension}?src={dataUrl|httpUrl}'`

## Project Outline

- `--./`: root is the location for the highest level files in the mono-repo (root package.jso)
- `--/src`: location of the source code for the core image optimizer
- `--/infra`: location of the infrastructure-as-code AWS cdk source code for the serverless rest api service that hosts the optimizer

## Getting Started

Assuming you already have node installed on your machine, install everything from the root folder:

1. `npm i`

## Testing

run `npm run test` from root of the project

## Building

run `npm run build` from the root of the project

this will build both the src and infra submodules

## Deploying

1. for AWS CDK to generate all of the CloudFormation, first you need to run `npx cdk synth` from the `./infra` folder
1. If you want to actually deploy this service to AWS (and pay for it), you need to update the stack files in `./infra` for your aws account details.
1. for AWS CDK to actually deploy the CloudFormation, you need to then run `npx cdk deploy` from the `./infra` folder
