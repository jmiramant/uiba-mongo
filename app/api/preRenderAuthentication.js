import axios from 'axios';

/*
If it's initialized with a cookie, it sets it as a global interceptor
if it gets called with no arguemnts, it deletes *all* request intercepotrs
This is from https://github.com/reactGo/reactGo/pull/225 
*/

let interceptorID;
export default function ssrAuth(cookie) {

  console.log('PreAuth Start')
  console.log(cookie)
  console.log('args:', arguments)
  console.log('PreAuth End')
  if (arguments.length === 0) {
   axios.interceptors.request.eject(interceptorID);
  } else {
    interceptorID = axios.interceptors.request.use(function(config) {
      config.headers['cookie'] = cookie;
      return config;
    }, function(error) {
      console.log('BOOOOOOOMMM')
      return Promise.reject(error);
    });
  }
}