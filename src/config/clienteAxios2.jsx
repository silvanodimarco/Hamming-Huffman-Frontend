import axios from 'axios';

const clienteAxios2 = axios.create({
    baseURL: "http://localhost:4567"
});

export default clienteAxios2;