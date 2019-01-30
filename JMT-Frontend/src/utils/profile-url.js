const bucket = 'jmt-bucket9551';
const region = 'ca-central-1';

const getProfileUrl = (str) => {
  return `https://s3.${region}.amazonaws.com/${bucket}/${str}`;
};

export default getProfileUrl;
