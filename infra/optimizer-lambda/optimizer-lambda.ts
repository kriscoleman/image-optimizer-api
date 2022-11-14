/* 
This code uses callbacks to handle asynchronous function responses.
It currently demonstrates using an async-await pattern. 
AWS supports both the async-await and promises patterns.
For more information, see the following: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/calling-services-asynchronously.html
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html 
*/
import optimizer from '../../src/optimizer/optimizer';

export const main = async (event: any, context: any) => {
  try {
    var method = event.httpMethod;

    if (method === 'GET') {
      if (event.startsWith === '/web/') {
        var imageSrc = event['queryStringParameters']['src'];
        const optimizedImage = await optimizer(imageSrc);
        return {
          statusCode: 200,
          headers: {},
          body: `data:${optimizedImage?.mimeType};base64,${(await optimizedImage?.buffer)?.toString('base64')}`,
        };
      }
    }

    // only accept GET for now
    return {
      statusCode: 400,
      headers: {},
      body: 'We only accept GET /',
    };
  } catch (error: any) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify(body),
    };
  }
};
