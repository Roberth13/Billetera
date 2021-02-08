import React, { Component } from 'react'
import ClienteService from '../../services/ClienteService';

class CreateClienteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nombres: '',
            documento: '',
            email: '',
            celular: ''
        }
        this.changeDocumentoHandler = this.changeDocumentoHandler.bind(this);
        this.changeNombresHandler = this.changeNombresHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeCelularHandler = this.changeCelularHandler.bind(this);
        this.guardarCliente = this.guardarCliente.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }/*else{
            ClienteService.getClienteById(this.state.id).then( (res) =>{
                let cliente = res.data;
                this.setState({
                    documento: cliente.documento,
                    nombres: cliente.nombres,
                    email : cliente.email,
                    celular : cliente.celular
                });
            });
        }    */    
    }

    guardarCliente = (e) => {
        e.preventDefault();
        let cliente = {documento: this.state.documento, nombres: this.state.nombres, email: this.state.email, celular: this.state.celular};
        console.log('cliente => ' + JSON.stringify(cliente));

        if(this.state.id === '_add'){
            ClienteService.createCliente(cliente).then(_ =>{
                this.props.history.push('/clientes');
            });
        }else{
           /* ClienteService.updateEmployee(cliente, this.state.id).then( res => {
                this.props.history.push('/employees');
            });*/
        }
    }

    changeDocumentoHandler= (event) => {
        this.setState({documento: event.target.value});
    }

    changeNombresHandler= (event) => {
        this.setState({nombres: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeCelularHandler= (event) => {
        this.setState({celular: event.target.value});
    }

    cancel(){
        this.props.history.push('/clientes');
    }

    obtenerTitulo(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Agregar Cliente</h3>
        }else{
            return <h3 className="text-center">Actualizar Cliente</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-8 offset-md-2 offset-md-2">
                                {
                                    this.obtenerTitulo()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Documento: </label>
                                            <input placeholder="Documento" name="documento" type="number" className="form-control" 
                                                value={this.state.documento} onChange={this.changeDocumentoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Nombres: </label>
                                            <input placeholder="Nombres" name="nombres" className="form-control" 
                                                value={this.state.nombres} onChange={this.changeNombresHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email Address" name="email" type="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Celular: </label>
                                            <input placeholder="Celular" name="celular" type="number" className="form-control" 
                                                value={this.state.celular} onChange={this.changeCelularHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.guardarCliente}>Guardar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                   </div>
            </div>
        )
    }
}

export default CreateClienteComponent;