import axios from 'axios';

const CLIENTE_API_BASE_URL = "http://localhost:5000/api/clientes";
const BILLETERA_API_BASE_URL = "http://localhost:5000/api/billetera";
const COMPRA_API_BASE_URL = "http://localhost:5000/api/compra";

class ClienteService{
    getClientes(){
        return axios.get(CLIENTE_API_BASE_URL);
    }

    getCliente(id){
        return axios.get(CLIENTE_API_BASE_URL+"/"+id);
    }

    createCliente(cliente){
        return axios.post(CLIENTE_API_BASE_URL, cliente);
    }

    consultarSaldo(cliente){
        return axios.post(BILLETERA_API_BASE_URL, cliente);
    }

    recargarSaldo(cliente){
        return axios.patch(BILLETERA_API_BASE_URL, cliente);
    }

    crearCompra(data){
        return axios.post(COMPRA_API_BASE_URL, data);
    }

    confirmarCompra(data){
        return axios.patch(COMPRA_API_BASE_URL, data);
    }
}

export default new ClienteService()