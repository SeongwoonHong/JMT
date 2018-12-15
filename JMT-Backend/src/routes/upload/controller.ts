import { Request, Response } from 'express';
import * as uuid from 'uuid/v1';
import axios from '@utils/axios';
import s3 from '@utils/s3';
import * as mime from 'mime-types';

export const profilePictureUpload = (req, res: Response) => {
  const key = `${req.decoded.email}/${uuid()}.jpeg`;
  // TODO: add expiration time
  s3.getSignedUrl('putObject', {
    Bucket: 'jmt-bucket9551',
    ContentType: 'image/jpeg', // TODO:, this should be somtehing like mime.lookup(file)
    Key: key,
  }, (err, url) => {
    if (err) return console.log(err);
    return res.send({ key, url });
  });
};
