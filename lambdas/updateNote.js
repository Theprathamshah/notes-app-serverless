
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);

// export const handler = async (event, context, cb) => {
//     let notesId = event.pathParameters.id;
//     let data = JSON.parse(event.body);
//     console.log(data);
//     try {
//         const command = new UpdateCommand({
//             TableName: 'NotesTable',
//             Item: {
//                 notesId,
//                 description: data.description,
//                 title:data.title
//             }
//         })
//         const response = await docClient.send(command);
//         return {
//             statusCode: 200,
//             body: JSON.stringify(response)
//         }

//     } catch (error) {
//         cb(null, {
//             statusCode: 500,
//             body:JSON.stringify('Failed to update the data')
//         })
//     }
    
// }

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context, cb) => {
    const notesId = event.pathParameters.id;
    const data = JSON.parse(event.body);
    const stage = process.env.STAGE;
    console.log(stage);

    try {
        const command = new UpdateCommand({
            TableName: `NotesTable-${stage}`,
            Key: { notesId },
            UpdateExpression: 'set #title = :title, #description = :description',
            ExpressionAttributeNames: {
                '#title': 'title',
                '#description': 'description'
            },
            ExpressionAttributeValues: {
                ':title': data.title,
                ':description': data.description
            },
            ReturnValues: 'ALL_NEW' // returns the updated item attributes
        });

        const response = await docClient.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify(response.Attributes)
        };

    } catch (error) {
        console.log(error);
        return cb(null, {
            statusCode: 500,
            body: JSON.stringify('Failed to update the data')
        });
    }
};
