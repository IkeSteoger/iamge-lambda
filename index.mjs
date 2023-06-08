import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch';

export const handler = async (event) => {
  let s3Client = new S3Client({region: 'us-west-2'});

  let name = event.Records[0].s3.object.key;
  let size = event.Records[0].s3.object.size;
  let type = '.jpg';
  let newImageData = { name, size, type };
  console.log('this is my new newImageData: ', newImageData);

  let params = {
    Bucket: 'ikesteoger-images',
    Key: 'images.json',
  };

  let data;

  try {
    let s3results = await s3Client.send(new GetObjectCommand(params));
    let response = new Response(s3results.Body);
    data = await response.json();
    // console.log('this is my data from my GET request', data);
  } catch (error) {
    console.log('get object Error: ', error);
    data = [];
  }

  data.push(newImageData);
  console.log('this is my data after push: ', data);

  let stringifiedDtails = JSON.stringify(data)

  let putParams = {
    ...params,
    Body: stringifiedDtails,
    ContentType: 'application/json',
  }

  try {
    await s3Client.send(new PutObjectCommand(putParams));
  } catch (error) {
    console.log('put object error: ', error);
  }

  const response = {
    statusCode: 200,
    body: stringifiedDtails,
  };
  return response;
};
