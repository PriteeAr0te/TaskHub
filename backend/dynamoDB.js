const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAUX67S4PVBJQ2ECOK',
  secretAccessKey: '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',
  region: 'Global', 
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
