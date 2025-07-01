import axios from 'axios';
import {BASE_URL} from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Set a timeout of 10 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Add a request interceptor 
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add authorization token or other headers here if needed
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) =>{
        if(error.response){
            if(error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                console.error('Unauthorized access - redirecting to login');
                window.location.href = '/login'; // Adjust the path as needed
            }else if (error.response.status === 500) {
                // Handle server errors
                console.error('Server error occurred, please try again later');
            }
            else if (error.code === 'ECONNABORTED') {
                // Handle timeout errors
                console.error('Request timed out, please try again later');
            }
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;