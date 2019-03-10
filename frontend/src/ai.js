import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/data/',
  timeout: 1000,
  // headers: {'Access-Control-Allow-Headers': '*'},
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});
