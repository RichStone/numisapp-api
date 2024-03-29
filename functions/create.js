import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      ProductId: uuid.v1(),
      UserId: event.requestContext.identity.cognitoIdentityId,
      Category: data.Category,
      Attachment: data.Attachment,
      CreatedAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
