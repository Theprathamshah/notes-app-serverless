import { DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"


const client = new DynamoDBClient({});

const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const stage = process.env.STAGE;
    console.log(stage);
    const body = JSON.parse(event.body);
    const command = new PutCommand({
        TableName: `NotesTable-${stage}`,
        Item: {
            notesId: body.notesId,
            title: body.title,
            description: body.description,
            date: new Date().toISOString()
        }
    })

    const response = await docClient.send(command);

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
    }
};