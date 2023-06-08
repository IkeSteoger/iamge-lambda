'use strict';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch';

const s3Client = new S3Client({region: 'us-west-2'});

export const handler = async (event) => {
  // proof of life
  // console.log('this is my event', event);

  const Bucket = 'ikesteoger-images';
  const Key = 'images.json';

  let name = event.Records[0].s3.object.key;
  let size = event.Records[0].s3.object.size;
  let type = 'jpg';
  let newImageObject = { name, size, type };
  console.log('this is my new imageobject', newImageObject);


  let params = {
    Bucket,
    Key,
  };
  console.log('THESE ARE MY PARAMS', params);

  let data;

  try {
    let s3results = await s3Client.send(new GetObjectCommand(params));
    const response = new Response (s3results.Body);
    data = await response.json();
    console.log('this is my data from my GET request', data);
    data.push(newImageObject);
  } catch (error) {
    console.warn('error: ', error);
  }

  let newParams = {
    ...params,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
  }

  try {
    await s3Client.send(new PutObjectCommand(newParams));
  } catch (error) {
    console.log('error: ', error);

  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('images'),
  };
  return response;
};
