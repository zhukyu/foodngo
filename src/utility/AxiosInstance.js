import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://foodngo.vercel.app/api', // replace with your base URL
    baseURL: 'http://127.0.0.1:3001/api', // dev env
    headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${localStorage.getItem('access_token')}` // replace with your authorization token
    }
});

// Function to refresh the access token
const refreshAccessToken = async () => {
    const response = await axiosInstance.post('/auth/token', {
        token: localStorage.getItem('refresh_token')
    });
    const newAccessToken = response.data.accessToken;
    
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
    
    localStorage.setItem('access_token', newAccessToken);
};

// Add an interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        
        // Check if the error is due to an expired token
        if (error.response.status === 403 && error.response.data === "Token is not valid" && !originalRequest._retry) {
            console.log(error.response);

            originalRequest._retry = true;
            
            // Refresh the access token
            return refreshAccessToken()
                .then(() => {
                    // Retry the original request with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
                    return axiosInstance(originalRequest);
                });
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
