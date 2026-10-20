import axios from 'axios';

const Api = axios.create({

    baseURL: 'http://localhost:3000/'//Endereco onde se encontra a nossa API

})

export default Api;