import axios from 'axios';
//import {decode} from 'jwt-decode'; // For decoding the JWT and checking expiry
import { jwtDecode } from 'jwt-decode' // import dependency


export const api = axios.create({
    baseURL:'http://localhost:8080',
    withCredentials:true,  
});
api.interceptors.request.use(
    async(config)=>{
        const token = localStorage.getItem("jwt");
        console.log("token ",token);
        if(token!=null){
            config.headers["Authorization"]=`Bearer ${token}`
            console.log("config ",config); 
        }
        let csrfToken = localStorage.getItem("CSRF_TOKEN");
        
       if(!csrfToken){
      try{
          const res = await axios.get(`http://localhost:8080/api/auth/csrf-token`,
        {withCredentials:true}
       );
       csrfToken = res.data.token;
       console.log(csrfToken);
       localStorage.setItem("CSRF_TOKEN",csrfToken);

      }catch(error){
        console.log("failed to fetch CSRF token ",error);
      }
    }
    if(csrfToken){
      config.headers["X-XSRF-TOKEN"]=csrfToken;
    }




        return  config;
    },
    (error)=>{
        console.log(error);
        return Promise.reject(error);
    }
);

// api.interceptors.response.use(
//     (response) => {
//       // Return the response as is if successful
//       return response;
//     },
//     async (error) => {
//       // Check if the error is due to an expired token (401 status)
//       if (error.response?.status === 401) {
//         // Attempt token refresh logic here
//         console.error('Token expired or unauthorized. Please log in again.');
        
//         // Redirect to login or handle token refresh
//       }
//       return Promise.reject(error);
//     }
//   );


api.interceptors.response.use(
  (response) => response,  // Allow the request to pass through
  async (error) => {
    const originalRequest = error.config;
    
    // Check if the error is a 401 (Unauthorized) error indicating expired token
    if (error.response && error.response.status === 401) {
      // Decode the JWT to check if it's expired
      const token = localStorage.getItem("jwt") // Or use localStorage
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decode the JWT
          const isExpired = decodedToken.exp * 10000 < Date.now(); // exp is in seconds, convert to milliseconds
          if (isExpired) {
            // Token is expired, clear the token from cookies or localStorage
            localStorage.removeItem("jwt"); // Or localStorage.removeItem('authToken')
            
            // Redirect to login page
            window.location.href = '/login'; // This will reload the page and navigate to login
            return; // Return early, no need to proceed with the request
          }
        } catch (decodeError) {
          console.error('Error decoding the token', decodeError);
        }
      }
    }

    // If error isn't 401 or token expiry, just reject the request
    return Promise.reject(error);
  }
);