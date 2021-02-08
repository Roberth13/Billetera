import React, { Component } from 'react'
import ClienteService from '../../services/ClienteService';

class ConsultarSaldoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            documento: 0,
            celular: 0,
            saldo: 0,
            type_msg: '',
            msg: ''            
        }

        //this.consultarSaldo = this.consultarSaldo.bind(this);
    }

    consultarSaldo = (e) => {
        e.preventDefault();
        ClienteService.consultarSaldo(this.state).then(res => {
            console.log(res.data.saldo);
            if(res.data.saldo){
                this.setState({saldo: res.data.saldo});
                this.setState({type_msg: 'success'})
                this.setState({msg: res.data.success})
            }     
        }).catch(err =>{
            this.setState({type_msg: 'danger'})
            this.setState({msg: "Billetera no encontrada"})
        })
    }

    changeDocumentoHandler= (event) => {
        this.setState({documento: event.target.value});
    }

    changeCelularHandler= (event) => {
        this.setState({celular: event.target.value});
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
                            <h3 className="text-center mt-2">Consultar Saldo</h3>
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
                                        <label> Saldo: </label>
                                        <input placeholder="Saldo" name="saldo" type="number" className="form-control" 
                                            value={this.state.saldo} disabled/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.consultarSaldo}>Consultar</button>
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

export default ConsultarSaldoComponent;