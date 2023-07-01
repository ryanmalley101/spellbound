const aws = require('aws-sdk');
const lambda = new aws.Lambda({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
  const functionName = 'addUserToDatabase'; // Replace with your Lambda function name

  const params = {
    FunctionName: functionName,
    InvocationType: 'Event',
    Payload: JSON.stringify(event),
  };

  lambda.invoke(params, (err, data) => {
    if (err) {
      console.log('Error calling Lambda function: ', err);
      callback(null, event);
    } else {
      console.log('Lambda function executed successfully.');
      callback(null, event);
    }
  });
};