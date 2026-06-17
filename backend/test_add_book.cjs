const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function run() {
  try {
    const api = axios.create({ baseURL: 'http://localhost:8000/api' });
    
    // Login to get session cookies and CSRF
    await api.get('/sanctum/csrf-cookie');
    const loginRes = await api.post('/auth/login', { email: 'admin@library.com', password: 'password' });
    const cookie = loginRes.headers['set-cookie'].join('; ');
    
    const fd = new FormData();
    fd.append('title', 'Computer Network Management System');
    fd.append('author', 'Dian Nugraha S.ST., M.IT');
    fd.append('category_id', '4');
    fd.append('type', 'fisik');
    fd.append('stock', '1');
    fd.append('pages', '42');
    fd.append('price', '0');
    fd.append('isbn', '978-623-491-377-4');
    
    const res = await api.post('/admin/books', fd, {
      headers: { ...fd.getHeaders(), Cookie: cookie }
    });
    console.log("Success:", res.data);
  } catch (e) {
    console.log("Error:", e.response?.status, e.response?.data);
  }
}
run();
