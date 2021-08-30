const cors = require("cors");
const express = require('express')

const app = express()
const routes = require("./routes");

const conf = require('dotenv').config()

app.use(express.json({
  limit:'50mb'
}))
app.use(express.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}))

port = process.env.PORT;

app.use(routes.router)


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })