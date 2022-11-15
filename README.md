# image-optimizer-api

A serverless api for optimizing images

It uses sharp (a popular npm package which uses libvips to reliably resize/optimize images) to optimize a dataUrl or http url image to reduce file size.

In order to provide the optimization as a service that customers can consume in their <img/> html tags, this project follows an infrastructure-as-code strategy to wrap this optimizer in a rest api.

The rest api is implemented as a serverless lambda function behind a API gateway, written in AWK CDK.

For local testing, express has been implemented to host the api from your local machine.

## Getting Started

Assuming you already have node installed on your machine, install everything from the root folder:

1. `npm i`

## How to start Express server for Local Testing

This project has implemented Express server for local testing. After installing all deps, you can open a terminal from the `./express` directory and run:

1. `npm run start`

You should see a message in the console that the app is running and listening on port 3000.

## Hello World!

After starting the express server, you can open `./express/hello-world.html` to see the endpoint in action!

## How to use the Rest API service once deployed locally via express

You can also curl it for a simple response.

`curl -X GET 'http://localhost:3000/web/{yourDesiredImageName}.{yourDesiredFileExtension}?src={dataUrl|httpUrl}'`

ex: `curl -X get 'http://localhost:3000/web/image.png?src=https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'`

## Project Outline

- `--./`: root is the location for the highest level files in the mono-repo (root package.jso)
- `--/src`: location of the source code for the core image optimizer
- `--/infra`: location of the infrastructure-as-code AWS cdk source code for the serverless rest api service that hosts the optimizer

## Testing

run `npm run test` from root of the project

## Building

run `npm run build` from the root of the project

this will build both the src and infra submodules

## Deploying to AWS

1. for AWS CDK to generate all of the CloudFormation, first you need to run `npx cdk synth` from the `./infra` folder
1. If you want to actually deploy this service to AWS (and pay for it), you need to update the stack files in `./infra` for your aws account details.
1. for AWS CDK to actually deploy the CloudFormation, you need to then run `npx cdk deploy` from the `./infra` folder

## How to use the Rest API service once deployed to AWS

`curl -X GET 'https://{GUID}.execute-api.{REGION}.amazonaws.com/prod/web/{yourDesiredImageName}.{yourDesiredFileExtension}?src={dataUrl|httpUrl}'`

## Minimum Viable Product Achieved!

For MVP, we wanted to create a simple serverless REST API using AWS ApiGateway and Lambda, written with AWS CDK for infrastructure as code.
This Rest Service would use a reusable core image optimizer, with validation for the provided image data.
Lambda and API Gateway provide scalability.

## For the near-future: Minimal Marketable Product

For MMP, we should consider adding a AWS WAF (Web Application Firewall) for additional security, including DDOS protection up to Layer 7.

## For the far-future: Fixing the performance and monetary costs of this Rest API architecture

After MMP, we should improve our performance and reduce our monetary costs.

Using our infrastructure-as-code base, we could add another layer to the stack to implement AWS Cloudfront as a Content Delivery Network. Our lambda could store optimized images in a global s3 bucket, which we then serve with a CDN and distribute globally across all regions. An additional lambda@edge function could be implemented to live at each edge location and first look up the asset from the edge location, if not found, then it could redirect the user to the optimizer lambda (which would then store the optimized asset for subsequent requests).

This would fix the dynamic nature of this architecture to provide a semi-static service. After the first request, subsequent requests would be fulfilled statically by pre-optimized assets from a CDN edge location. This would significantly increase performance for our end users, while also significantly reducing the expense of Just-In-Time lambda executions for our optimizer.
