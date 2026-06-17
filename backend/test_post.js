const axios = require('axios');
const FormData = require('form-data');
async function run() {
  try {
    const fd = new FormData();
    fd.append('title', 'T');
    fd.append('author', 'A');
    fd.append('category_id', '1');
    fd.append('type', 'fisik');
    fd.append('stock', '1');
    fd.append('pages', '1');
    fd.append('price', '0');
    fd.append('isbn', '123');
    
    // Simulating Axios interceptor
    const headers = { ...fd.getHeaders(), 'Content-Type': 'multipart/form-data' };
    if (fd instanceof FormData) {
      delete headers['Content-Type']; // Wait, Axios interceptor deletes config.headers['Content-Type']
    }
    
    // We can just use curl to test
  } catch (e) {}
}
