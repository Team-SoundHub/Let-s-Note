import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://letsnote-rough-wind-6773.fly.dev/api/v1'
});

axiosInstance.interceptors.request.use(
  config => {    
    const accessToken = localStorage.getItem('access');
    if (accessToken) {      
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {    
    return Promise.reject(error);
  }
);

export default axiosInstance;
