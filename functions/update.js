import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      UserId: event.requestContext.identity.cognitoIdentityId,
      ProductId: event.pathParameters.id
    },
    UpdateExpression: "SET Category = :Category, Attachment = :Attachment",
    ExpressionAttributeValues: {
      ":Attachment": data.Attachment || null,
      ":Category": data.Category || null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
