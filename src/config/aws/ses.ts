import aws from 'aws-sdk';
import 'dotenv/config';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1',
});

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
  },
});

export = ses;
