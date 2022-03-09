require('newrelic');
const express = require('express')
const app = express()
//const mongoose = require('mongoose')
const routes = require('./routes/routes') // includes the routes.js file
const dotenv = require('dotenv')
const connectDB = require('./database/connection')

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080
const hostname = process.env.hostname


app.use(express.json()) // we need to tell server to use json as well
app.use(routes) // tells the server to use the routes in routes.js

connectDB() // mongoDB connection

/* mongoose.connect(process.env.db_url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected')) */


app.listen(PORT, process.env.hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`)
})