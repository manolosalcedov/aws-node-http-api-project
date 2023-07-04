const AWS = require('aws-sdk');
  const getMovies = async(event) =>  {
      try {
          const dynamodb = new AWS.DynamoDB.DocumentClient();
          // scan es como hacer un fetch de toda la tabla
          const result = await dynamodb.scan({
              TableName: 'MoviesTable'
          }).promise();
          const movies = result.Items;

          return {
              status: 200,
              body: {
                  movies
              }
          };
      } catch(error) {
          console.log(error);
      }   
  }
  module.exports = {
      getMovies
  }