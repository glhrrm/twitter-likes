const express = require('express')
const consign = require('consign')

app = express()

consign()
    .include('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3003)