const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes") 

mongoose
	.connect("mongodb://localhost:27017/billetera_dig", { useNewUrlParser: true, })
	.then(() => {
		const app = express()
        app.use(express.json())

		app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});

		app.use("/api", routes) 

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})