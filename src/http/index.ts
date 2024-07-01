import * as axios from 'axios';

const http = axios.default.create({
  baseURL: 'http://localhost:3001/'
})

export default http;