const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const headers = {
    'Content-Type': 'application/json',
    'Acces-Control-Allow-Origen': '*',
    'Acces-Control-Allow-Methods': 'GTE, POST, OPTIONS'   
 }

const addMovie = async(event) => {

    // Conectar a la Base de datos a través del ClientId
    // y el Client Secret ya configurado:
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    // Recoger los datos provenientes del body de la petición
    const { title, director, year } = JSON.parse(event.body);

    const createAt = new Date();
    const id = uuidv4();

    // Crear el objeto para guardar
    const newMovie = {
        id,
        title,
        director,
        year,
        createAt
    }

    // put permite guardar un dato
    // ( no es como el PUT en REST )
    await dynamodb.put({
        TableName: 'MoviesTable',
        Item: newMovie
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newMovie),
        headers : headers
    }
}

module.exports = {
    addMovie
};