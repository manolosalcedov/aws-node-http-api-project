const AWS = require('aws-sdk');

  const updateMovie = async(event) =>  {

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        // Extraer el id desde los parámetros del path:
        const { id } = event.pathParameters;

        // Extraer valores recibidos a través del evento:
        const { title, director } = JSON.parse(event.body);

        const result = await dynamodb.update({
            TableName: 'MoviesTable',

            // Setear cada uno de los valores
            UpdateExpression: 'set title = :title, director = :director',
            ExpressionAttributeValues: {                
                ':title': title,
                ':director': director
            },

            // Indicar el id que debe modificar:
            Key: { id },

            // Retornar el valor actual:
            ReturnValues: 'ALL_NEW'

        }).promise();

        return {
            status: 200,
            body: JSON.stringify({
                message: 'Movie updated successfully'
            })
        };
    } catch(error) {
        console.log(error);
    }    
  }

  module.exports = {
    updateMovie,
  }