import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://foodngo-v1.onrender.com/api', // replace with your base URL
    headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${localStorage.getItem('access_token')}` // replace with your authorization token
    }
});

export default axiosInstance;