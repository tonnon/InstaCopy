import axios from 'axios'; // Biblioteca para requisições http

const api = axios.create({
    baseURL: 'http://localhost:1111',
}) // URL da API

export default api;
