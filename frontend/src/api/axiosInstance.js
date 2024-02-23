import axios from 'axios';
import AuthModule from "../components/auth/AuthModule";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  config => {    
    const accessToken = sessionStorage.getItem('access');
    if (accessToken) {      
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {    
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, async (error) => {
        if(error.response?.status === 401) {
            AuthModule();
        }
    }
)

export default axiosInstance;
