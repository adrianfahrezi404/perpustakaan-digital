const axios = require('axios');
const headers = new axios.AxiosHeaders();
headers.set('Content-Type', 'multipart/form-data');
delete headers['Content-Type'];
console.log(headers.has('Content-Type')); // if true, delete failed!
