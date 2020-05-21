import axios from 'axios';
import { sessionService } from './session.service';
import { ACCESS_TOKEN } from '../constants';

// https://github.com/axios/axios


const instance = axios.create({});

// axios.interceptors.request.use(config => {
//   if (typeof window === 'undefined') {
//     return config;
//   }
//   const token = sessionService.get(ACCESS_TOKEN);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const get = url => instance.get(url);
// const post = (url, data) => instance.post(url, data);
// const put = (url, data) => instance.put(url, data);
// const delete = url => instance.delete(url);

const dataService = {
  get: (url, data) => instance.get(url, data),  // might send data such as query
  // post: (url, data) => {
  //   const p = new Promise((resolve,reject) => {
  //     const req = instance.post(url, data)
  //     console.log('axios freq', req)
  //     req.then( data => {
  //       console.log('axios data', data)
  //       resolve(data)
  //     })
  //     .catch(e => {
  //       console.log('axios error', e)
  //       reject(e)
  //     })

  //   } )
  //   return p
  // },
  post: (url, data) => instance.post(url, data),
  put: (url, data) => instance.put(url, data),
  delete: url => instance.delete(url)
}

export default dataService
