import { Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

export const hello: Handler = async (event: any) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  return new Promise((resolve) => {
    resolve(response)
  })
}

export const createReminder: Handler = async (event: any) => {
  const body = event.body;
  console.log(body);
  console.log(process.env.DYNAMODB_REMINDERS_T, 'env');
  const dynamoDb = new DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_REMINDERS_T,
    Item: {
      primary_key: body.name,
      reminder: body.reminder,
      date: new Date().toISOString()
    }
  }

  await dynamoDb.put(putParams).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Reminder created!!',
        input: event,
      },
      null,
      2
    ),
  };

  return new Promise((resolve) => {
    resolve(response)
  })
}

export const createTest: Handler = async (event: any) => {
  console.log(event);
  const body = event.body;
  console.log(body);
  console.log(process.env.DYNAMODB_REMINDERS_T, 'env');
  const dynamoDb = new DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_REMINDERS_T,
    Item: {
      primary_key: 'test',
      reminder: 'testReminder',
      date: new Date().toISOString()
    }
  }

  await dynamoDb.put(putParams).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Reminder created!!',
        input: event,
      },
      null,
      2
    ),
  };

  return new Promise((resolve) => {
    resolve(response)
  })
}