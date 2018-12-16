import { Request, Response } from 'express';
import * as uuid from 'uuid/v1';
import axios from 'axios';
import s3 from '@utils/s3';
import * as mime from 'mime-types';

export const profilePictureUpload = (req, res: Response) => {
  const key = `${req.decoded.email}/${uuid()}.jpeg`;
  const { AWS_BUCKET: Bucket } = process.env;
  const { fileName } = req.query;

  s3.getSignedUrl('putObject', {
    Bucket,
    ContentType: mime.lookup(fileName),
    Key: key,
  }, (err, url) => {
    if (err) return console.log(err);
    return res.send({ key, url });
  });
};
