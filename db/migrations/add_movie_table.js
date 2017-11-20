var AWS  = require('aws-sdk');

AWS.config.update({
  region : "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamoDb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};
console.log("start migration....")
dynamoDb.createTable(params, (err, data) => {
  if (err) {
    console.log("An error occured while running migration for Movies Table",JSON.stringify(err, null, 2));
  }
  else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});