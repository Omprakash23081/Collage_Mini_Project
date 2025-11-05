import axios from "axios";

//it will define base url so that we can just referance verable and mathod by witch we will call backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default apiClient;
