import { DynamoDBClient} from "@aws-sdk/client-dynamodb";

import { DeleteCommand,DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);



export const handler = async (event) => {

    if (!event.pathParameters || !event.pathParameters.id) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Please enter valid id" }),
        }
    }
    const stage = process.env.STAGE;
    console.log(stage);

    let notesId = event.pathParameters.id;
    const command = new DeleteCommand({
        TableName: `NotesTable-${stage}`,
        Key: {
            notesId
        }
    })
    const response = await docClient.send(command);
    return {
        statusCode: 200,
        body: JSON.stringify(`The note with id ${notesId} has been deleted`)
    }
}