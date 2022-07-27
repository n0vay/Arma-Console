import axios from  'axios';

export const instance = axios.create({
        baseURL : 'https://tilosia-arma-web-backend.herokuapp.com/api/v1',
        // baseURL : 'http://localhost:8000/api',
});