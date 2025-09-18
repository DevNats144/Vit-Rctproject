import axios from 'axios';

const Api = axios.create({

    baseURL: 'https://apiproj-render.onrender.com'//Endereco onde se encontra a nossa API

})

export default Api;