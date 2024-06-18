
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async () => {
    const stage = process.env.STAGE;
    console.log(stage);
    const command = new ScanCommand({
        TableName: `NotesTable-${stage}`,
    })
    const { Items } = await docClient.send(command);

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Items),
    }


}