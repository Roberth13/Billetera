const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes") // new

mongoose
	.connect("mongodb://localhost:27017/billetera_dig", { useNewUrlParser: true, })
	.then(() => {
		const app = express()
        app.use(express.json())
		app.use("/api", routes) // new

		app.listen(3000, () => {
			console.log("Server has started!")
		})
	})