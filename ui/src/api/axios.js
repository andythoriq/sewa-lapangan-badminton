import axios from 'axios'

export default axios.create({
   // baseURL: 'http://localhost:8000',
   baseURL: 'http://localhost/sewa-lapangan-badminton/api/public',
   withCredentials: true,

   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": true
   }
})