import axios from 'axios';

const Api = axios.create({

    baseURL: 'https://the-apipro.onrender.com'//Endereco onde se encontra a nossa API

})

export default Api;