const express = require("express")
const Cliente = require("./models/Clientes") 
const Compra = require("./models/Compra") 
const router = express.Router()

const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

/**
 * Obtener toda la lista de clientes registrados
 */
router.get("/clientes", async (_, res) => {
    await Cliente.find()
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

/**
 * Crear un cliente
 */
router.post("/clientes", async (req, res) => {
    const cliente = new Cliente({
		nombres: req.body.nombres,
		documento: req.body.documento,
		email: req.body.email,
		celular: req.body.celular
	})
	await cliente.save().then(function(client) {
        res.send({success: "Cliente agregado con éxito", cliente: client })
    }).catch(error =>{
        //res.send(error);
        if (error.name === 'MongoError' && error.code === 11000) {     
            res.send({
                error: true,
                codigo: 503,
                mensaje: "Ya existe un cliente registrado con el documento: "+req.body.documento
            }); 
        }        
        else if(error.errors.celular){
            res.send({
                error: true,
                codigo: 503,
                mensaje: "El número de celular es requerido"
            });  
        }
        else if(error.errors.documento){
            res.send({
                error: true,
                codigo: 503,
                mensaje: "El documento es requerido"
            });  
        }
        else if(error.errors.email){
            res.send({
                error: true,
                codigo: 503,
                mensaje: "El email es requerido"
            });  
        }
        else if(error.errors.nombre){
            res.send({
                error: true,
                codigo: 503,
                mensaje: "El nombres es requerido"
            });  
        }
    });
	
})

/**
 * Consultar la billetera de un cliente y actualiza el saldo
 */
router.patch("/billetera", async(req, res) =>{
    try {
		const cliente = await Cliente.findOne({ documento: req.body.documento, email: req.body.email })		
        if(cliente){
            if (req.body.saldo) {
                cliente.saldo = cliente.saldo + req.body.saldo
                await cliente.save()
                res.send({ success: "Saldo actualizado con éxito", cliente: cliente})
            }else{
                res.status(404)
                res.send({ error: "El saldo es requerido" })
            }            
        }else{
            res.status(404)
            res.send({ error: "Billetera no encontrada" })
        }        
	} catch {
		res.status(404)
		res.send({ error: "Billetera no encontrada" })
	}
})

/**
 * Consultar la billetera de un cliente
 */
router.post("/billetera", async(req, res) =>{
    try {
		const cliente = await Cliente.findOne({ documento: req.body.documento, celular: req.body.celular })	
        if(cliente){
            res.status(200) 
            res.send({success: "Billetera consultada con éxito", saldo: cliente.saldo})           
        }else{
            res.status(404)
            res.send({ error: "Billetera no encontrada" })
        } 
    }catch {
		res.status(404)
		res.send({ error: "Billetera no encontrada" })
	}
})

/**
 * Crear un registro de compra
 */
router.post("/compra", async(req, res) =>{
    let _token = '';
    for ( var i = 0; i < 6; i++ ) {
        _token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    if(_token.length == 6){
        const compra = new Compra({
            id_cliente: req.body.id_cliente,
            estado: 0,
            token: _token, 
            valor: req.body.valor
        })
        await compra.save().then(function(compra) {
            res.send({success: "Registro de compra creado", compra: compra})
        }).catch(error =>{
            console.log(error)
        })
    }
})

/**
 * Confirmar un registro de compra
 */
router.patch("/compra", async(req, res) =>{
    try {
		const compra = await Compra.findOne({ token: req.body.token, id_cliente: req.body.id_cliente })		
        if(compra){
            const cliente = await Cliente.findOne({ _id: compra.id_cliente})
            let _saldo = cliente.saldo - compra.valor;
            if(_saldo >= 0){
                cliente.saldo = _saldo;
                await cliente.save()
                compra.estado = 1;
                await compra.save();
                res.status(200)
                res.send({ success: "Compra confirmada y saldo actualizado con éxito", compra: compra, cliente: cliente})
            }else{
                res.status(404)
                res.send({ error: "El cliente no tiene suficiente saldo en la billetera"})
            }
        }else{
            res.status(404)
            res.send({ error: "Compra no encontrada" })
        }        
	} catch {
		res.status(404)
		res.send({ error: "Compra no encontrada" })
	}
})

module.exports = router