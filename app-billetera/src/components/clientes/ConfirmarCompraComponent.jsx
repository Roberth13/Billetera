import React, { Component } from 'react'
import ClienteService from '../../services/ClienteService';

class ConfirmarCompraComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            token: '',
            documento: '',
            type_msg: '',
            msg: ''            
        }
        this.changeTokenHandler = this.changeTokenHandler.bind(this);
    }

    componentDidMount(){  
        ClienteService.getCliente(this.state.id).then(res => {
            this.setState({documento: res.data.documento})
        }).catch(_ =>{
            this.setState({type_msg: 'danger'})
            this.setState({msg: "Ocurrió un error al consultar el cliente"})
        })
    }

    confirmar = (e) => {
        e.preventDefault();
        if(this.state.token.length === 6){
            let data = {
                id_cliente: this.state.id,
                token: this.state.token
            }
            ClienteService.confirmarCompra(data).then(res => {
                console.log(res);
                if(res.data.success){                    
                    this.setState({type_msg: 'success'})
                    this.setState({msg: res.data.success})
                }else if(res.data.error){
                    this.setState({type_msg: 'danger'})
                    this.setState({msg: res.data.error})
                }     
            }).catch(error =>{
                console.log(error);
                this.setState({type_msg: 'danger'})
                this.setState({msg: "Compra no encontrada"})
            })
        }else{
            this.setState({type_msg: 'danger'})
            this.setState({msg: "El token debe ser de 6 caracteres"})
        }        
    }

    changeTokenHandler= (event) => {
        this.setState({token: event.target.value});
    }

    cancel(){
        this.props.history.push('/clientes');
    }

    mostrarNotificacion(){
        if(this.state.type_msg === 'danger'){
            return (<div className="alert alert-danger" role="alert">
                    {this.state.msg}
                </div>)
        }else if(this.state.type_msg === 'success'){
            return (<div className="alert alert-success" role="alert">
                    {this.state.msg}
                </div>)
        }
    }

    render(){
        return(
            <div>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-8 offset-md-2 offset-md-2">
                            <h3 className="text-center mt-2">Confirmar compra</h3>
                            <div className = "card-body">
                                { this.mostrarNotificacion() }
                                <form>
                                    <div className = "form-group">
                                        <label> Documento: </label>
                                        <input placeholder="Documento" name="documento" type="number" className="form-control" 
                                            value={this.state.documento} disabled/>
                                    </div>                                  
                                    <div className = "form-group">
                                        <label> Token de confirmación: </label>
                                        <input placeholder="Token" name="token" className="form-control" 
                                            value={this.state.token} onChange={this.changeTokenHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.confirmar}>Confirmar</button>
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

export default ConfirmarCompraComponent;