import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

export const apiKey = '7a0af1084071dc4fc982afbfedbed521';