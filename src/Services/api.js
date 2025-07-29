import axios from 'axios';

const Api = axios.create({

    baseURL: 'https://the-apiproj.onrender.com'//Endereco onde se encontra a nossa API

})

export default Api;