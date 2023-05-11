import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://foodngo-v2.onrender.com/api', // replace with your base URL
    // baseURL: 'http://127.0.0.1:3001/api', // dev env
    headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${localStorage.getItem('access_token')}` // replace with your authorization token
    }
});

export default axiosInstance;