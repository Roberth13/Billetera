import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListClienteComponent from './components/clientes/ListClienteComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateClienteComponente from './components/clientes/CreateClienteComponent';
import ConsultarSaldoComponent from "./components/clientes/ConsultarSaldoComponent";
import RecargarSaldoComponent from "./components/clientes/RecargarSaldoComponent";
import CrearRegistroCompraComponent from "./components/clientes/CrearRegistroCompraComponent";
import ConfirmarCompraComponent from "./components/clientes/ConfirmarCompraComponent";

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListClienteComponent}></Route>
                          <Route path = "/clientes" component = {ListClienteComponent}></Route>
                          <Route path = "/add-cliente/:id" component = {CreateClienteComponente}></Route>
                          <Route path = "/consultar-saldo/:documento/:celular" component = {ConsultarSaldoComponent}></Route>
                          <Route path = "/recargar-saldo/:documento/:celular" component = {RecargarSaldoComponent}></Route>
                          <Route path = "/comprar/:id" component = {CrearRegistroCompraComponent}></Route>
                          <Route path = "/confirmar/:id" component = {ConfirmarCompraComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
