import axios from 'axios';

const {
  YELP_API_KEY: yelpApiKey
} = process.env;

axios.defaults.headers['Authorization'] = `Bearer ${yelpApiKey}`;

export default axios;
