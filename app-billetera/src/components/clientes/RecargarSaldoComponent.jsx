import React, { Component } from 'react'
import ClienteService from '../../services/ClienteService';

class RecargarSaldoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            documento: this.props.match.params.documento,
            celular: this.props.match.params.celular,
            saldo: 0,
            type_msg: '',
            msg: ''            
        }
    }

    recargarSaldo = (e) => {
        e.preventDefault();
        if(this.state.saldo > 0){
            ClienteService.recargarSaldo(this.state).then(res => {
                if(res.data.success){
                    this.setState({saldo: res.data.saldo});
                    this.setState({type_msg: 'success'})
                    this.setState({msg: res.data.success})
                }     
            }).catch(_ =>{
                this.setState({type_msg: 'danger'})
                this.setState({msg: "Billetera no encontrada"})
            })
        }else{
            this.setState({type_msg: 'danger'})
            this.setState({msg: "El Saldo a recargar debe ser mayor a 0"})
        }        
    }

    changeDocumentoHandler= (event) => {
        this.setState({documento: event.target.value});
    }

    changeCelularHandler= (event) => {
        this.setState({celular: event.target.value});
    }

    changeSaldoHandler= (event) => {
        this.setState({saldo: event.target.value});
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
                            <h3 className="text-center mt-2">Recargar Saldo</h3>
                            <div className = "card-body">
                                { this.mostrarNotificacion() }
                                <form>
                                    <div className = "form-group">
                                        <label> Documento: </label>
                                        <input placeholder="Documento" name="documento" type="number" className="form-control" 
                                            value={this.state.documento} onChange={this.changeDocumentoHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Celular: </label>
                                        <input placeholder="Celular" name="celular" type="number" className="form-control" 
                                            value={this.state.celular} onChange={this.changeCelularHandler}/>
                                    </div>                                    
                                    <div className = "form-group">
                                        <label> Valor a recargar: </label>
                                        <input placeholder="Saldo" name="saldo" type="number" className="form-control" 
                                            value={this.state.saldo} onChange={this.changeSaldoHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.recargarSaldo}>Recargar</button>
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

export default RecargarSaldoComponent;