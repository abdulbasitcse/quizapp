const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: "https://6dfe9e4e20234795a4ebbf3d89faf3a2@o1163440.ingest.sentry.io/6251543",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

require('newrelic');
const express = require('express')
const app = express()
//const mongoose = require('mongoose')
const routes = require('./routes/routes') // includes the routes.js file
//const dotenv = require('dotenv')
const connectDB = require('./database/connection')

//dotenv.config({path:'config.env'})
require('dotenv').config()

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
