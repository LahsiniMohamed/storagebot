const cors = require("cors");
const express = require('express')

const app = express()
const routes = require("./routes");

app.use(express.json({
  limit:'50mb'
}))
app.use(express.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}))

port = 8080;

app.use(routes.router)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })