import axios from 'axios';

const CLIENTE_API_BASE_URL = "http://localhost:5000/api/clientes";
const BILLETERA_API_BASE_URL = "http://localhost:5000/api/billetera";

class ClienteService{
    getClientes(){
        return axios.get(CLIENTE_API_BASE_URL);
    }

    createCliente(cliente){
        return axios.post(CLIENTE_API_BASE_URL, cliente);
    }

    consultarSaldo(cliente){
        return axios.post(BILLETERA_API_BASE_URL, cliente);
    }
}

export default new ClienteService()