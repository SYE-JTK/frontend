import axios from 'axios';

const BASE_URI = 'http://127.0.0.1:5000';

const client = axios.create({
 baseURL: BASE_URI,
 json: true
});

class APIClient {

 getDept() {
   return this.perform('get', '/dept');
 }

 getStud() {
   return this.perform('get', `/all`);
 }

 getCourses() {
   return this.perform('get', '/courses');
 }

 async perform (method, resource, data) {
   return client({
     method,
     url: resource,
     data,
     headers: {
       Authorization: `Bearer ${true}`
     }
   }).then(resp => {
     return resp.data ? resp.data : [];
   })
 }
}

export default APIClient;