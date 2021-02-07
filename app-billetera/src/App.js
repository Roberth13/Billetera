import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListClienteComponent from './components/clientes/ListClienteComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateClienteComponente from './components/clientes/CreateClienteComponent';

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
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
