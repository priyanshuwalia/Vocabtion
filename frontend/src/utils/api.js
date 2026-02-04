import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Prepare for deployed URL later if needed
});

export default api;
