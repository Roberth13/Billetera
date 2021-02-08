import React, { Component } from 'react'
import ClienteService from '../../services/ClienteService';

class CrearRegistroCompraComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            valor: 0,
            documento: '',
            type_msg: '',
            msg: ''            
        }
        this.changeValorHandler = this.changeValorHandler.bind(this);
    }

    componentDidMount(){  
        ClienteService.getCliente(this.state.id).then(res => {
            this.setState({documento: res.data.documento})
        }).catch(_ =>{
            this.setState({type_msg: 'danger'})
            this.setState({msg: "Ocurrió un error al consultar el cliente"})
        })
    }

    pagar = (e) => {
        e.preventDefault();
        if(this.state.valor > 0){
            let data = {
                id_cliente: this.state.id,
                valor: this.state.valor
            }
            ClienteService.crearCompra(data).then(res => {
                console.log(res);
                if(res.data.success){
                    this.setState({saldo: res.data.saldo});
                    this.setState({type_msg: 'success'})
                    this.setState({msg: res.data.success + ", Token: "+res.data.compra.token})
                }     
            }).catch(_ =>{
                this.setState({type_msg: 'danger'})
                this.setState({msg: "Ocurrio un error"})
            })
        }else{
            this.setState({type_msg: 'danger'})
            this.setState({msg: "El valor a pagar debe ser mayor a 0"})
        }        
    }

    changeValorHandler= (event) => {
        this.setState({valor: event.target.value});
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
                            <h3 className="text-center mt-2">Pagar compra</h3>
                            <div className = "card-body">
                                { this.mostrarNotificacion() }
                                <form>
                                    <div className = "form-group">
                                        <label> Documento: </label>
                                        <input placeholder="Documento" name="documento" type="number" className="form-control" 
                                            value={this.state.documento} disabled/>
                                    </div>                                  
                                    <div className = "form-group">
                                        <label> Valor: </label>
                                        <input placeholder="Valor" name="valor" type="number" className="form-control" 
                                            value={this.state.valor} onChange={this.changeValorHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.pagar}>Pagar</button>
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

export default CrearRegistroCompraComponent;