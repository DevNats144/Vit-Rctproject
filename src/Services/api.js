import axios from 'axios';

const Api = axios.create({

    baseURL: 'https://apiproj-production.up.railway.app'//Endereco onde se encontra a nossa API

})

export default Api;