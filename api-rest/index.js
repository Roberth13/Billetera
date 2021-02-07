const express = require("express");
const bodyParser= require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false", { useUnifiedTopology: true })
.then(client => {
    const db = client.db('billetera')
    const clientes = db.collection("clientes");
    const billetera = db.collection("billetera");

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    let respuesta = {};

    /**
     * Obtener un listado de todos los clientes registrados
     */
    app.get('/clientes', (req, res) => {
        clientes.find().toArray()
        .then(result => res.json(result))
        .catch(error => res.json(error))
    })

    /**
     * Crear un cliente
     */
    app.post('/clientes', (req, res) => {
        if(!req.body.nombres || !req.body.documento || !req.body.email || !req.body.celular){
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: "Los campos: Nombres, documento, email y celular son requeridos"
            }            
            res.send(respuesta); 
        }else{
            clientes.findOne({"documento": req.body.documento}).then(cliente_documento => {
                if(cliente_documento){
                    respuesta = {
                        error: true,
                        codigo: 503,
                        mensaje: "Ya existe un cliente registrado con el documento: "+req.body.documento
                    }            
                    res.send(respuesta); 
                }else{
                    clientes.findOne({"email": req.body.email}).then(cliente_email => {
                        if(cliente_email){
                            respuesta = {
                                error: true,
                                codigo: 503,
                                mensaje: "Ya existe un cliente registrado con el email: "+req.body.email
                            }            
                            res.send(respuesta); 
                        }else{
                            clientes.insertOne(req.body)
                            .then(result => {
                                respuesta = {
                                    error: false,
                                    codigo: 200,
                                    mensaje: "Cliente creado con éxito"
                                }
                                res.send(respuesta);
                            })
                            .catch(error => {
                                respuesta = {
                                    error: false,
                                    codigo: 501,
                                    mensaje: "Ocurrió un error al crear el cliente"
                                }
                                res.send(respuesta);
                            })
                        }
                    })
                }
            });
        }    
    })

    app.listen(3000, function () {
        console.log("Escuchando en el puerto 3000")
    })
})
.catch(error => console.error(error))
