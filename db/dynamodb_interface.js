var AWS  = require('aws-sdk');

AWS.config.update({
  region : "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamoDb = new AWS.DynamoDB();

module.exports = dynamoDb;