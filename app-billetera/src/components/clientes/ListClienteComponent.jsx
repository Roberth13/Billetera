import React, { Component } from 'react'
import ClienteService from '../../services/ClienteService'

class ListClienteComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientes: []
        }
        this.agregarCliente = this.agregarCliente.bind(this);
        this.consultarSaldo = this.consultarSaldo.bind(this);
    }

    componentDidMount(){
        ClienteService.getClientes().then((res) => {
            this.setState({ clientes: res.data});
        });
    }

    agregarCliente(){
        this.props.history.push('/add-cliente/_add');
    }

    consultarSaldo(documento, celular){
        this.props.history.push(`/consultar-saldo/${documento}/${celular}`);
    }

    recargarSaldo(documento, celular){
        this.props.history.push(`/recargar-saldo/${documento}/${celular}`);
    }

    comprar(id){
        this.props.history.push(`/comprar/${id}`);
    }

    confirmar(id){
        this.props.history.push(`/confirmar/${id}`);
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Listado de clientes</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.agregarCliente}> Agregar Cliente</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Nombres</th>
                                    <th>Email</th>
                                    <th>Celular</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.clientes.map(
                                        cliente => 
                                        <tr key = {cliente._id}>
                                             <td> {cliente.documento} </td>   
                                             <td> {cliente.nombres}</td>
                                             <td> {cliente.email}</td>
                                             <td> {cliente.celular}</td>
                                             <td>
                                                 <button onClick={ () => this.consultarSaldo(cliente.documento, cliente.celular)} className="btn btn-warning mr-2">Saldo </button>                                                 
                                                 <button onClick={ () => this.recargarSaldo(cliente.documento, cliente.celular)} className="btn btn-warning">Recargar </button>                                                 
                                                 <button onClick={ () => this.comprar(cliente._id)} className="btn btn-warning ml-2">Pagar </button>                                                 
                                                 <button onClick={ () => this.confirmar(cliente._id)} className="btn btn-warning ml-2">Confirmar </button>                                                 
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
            </div>
        )
    }
}

export default ListClienteComponent