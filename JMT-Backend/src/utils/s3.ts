import * as AWS from 'aws-sdk';

const {
  ACCESS_KEY_ID: accessKeyId,
  SECRET_ACCESS_KEY: secretAccessKey,
  AWS_REGION: region,
} = process.env;

class S3 {
  public s3;
  
  constructor() {
    this.initialize();
  }

  private initialize() {
    this.s3 = new AWS.S3({
      accessKeyId,
      secretAccessKey,
      signatureVersion: 'v4',
      region
    });
  }
}

export default new S3().s3;
