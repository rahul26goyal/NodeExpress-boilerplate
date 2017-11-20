var AWS = require('aws-sdk')
var fs = require('fs')
var path = require('path')

AWS.config.update({
  region: 'us-west-2',
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Movie data to Dyname DB...");
var filePath = path.join(__dirname, '..', 'data', 'sample_movie.json');
var allMovies = JSON.parse(fs.readFileSync(filePath, 'utf8'));

allMovies.forEach((movie) => {
  var params = {
    TableName : "Movies",
    Item : {
      'year' : movie.year,
      'title' : movie.title,
      'info' : movie.info
    }
  };
  docClient.put(params, (err, data) => {
    if (err) {
          console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("PutItem succeeded:", movie.title);
      }
  });
});