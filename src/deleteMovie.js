const AWS = require('aws-sdk');
  const deleteMovie = async(event) =>  {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;       
        const result = await dynamodb.delete({
            TableName: 'MoviesTable',          
            Key: { id }
        }).promise();
        return {
            status: 200,
            body: JSON.stringify({
                message: 'Movie deleted successfully'
            })
        };
    } catch(error) {
        console.log(error);
    }    
  }
  module.exports = {
    deleteMovie,
  }