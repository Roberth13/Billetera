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

    consultarSaldo(){
        this.props.history.push('/consultar-saldo');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Listado de clientes</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.agregarCliente}> Agregar Cliente</button>
                    <button className="btn btn-primary ml-4" onClick={this.consultarSaldo}> Consultar Saldo</button>
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