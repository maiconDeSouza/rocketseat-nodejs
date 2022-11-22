const express = require('express')

const app = express()

app.use(express.json())

const Middleware = require('./Middleware')
const Controllers = require('./Controllers')

app.post('/account', Middleware.checkIfThereIsCPF, Controllers.createNewCustomer)

app.get('/statement/:id', Controllers.statement)



const port = 1992
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
