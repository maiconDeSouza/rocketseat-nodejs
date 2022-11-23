const express = require('express')

const app = express()

app.use(express.json())

const Middleware = require('./Middleware')
const Controllers = require('./Controllers')

app.post('/account', Middleware.checkIfThereIsCPF, Controllers.createNewCustomer)

app.patch('/account', Middleware.checkID, Controllers.editCustomer)

app.delete('/account', Middleware.checkID, Controllers.deleteCustomer)

app.get('/statement/date', Middleware.checkID, Controllers.statementDate)

app.get('/statement', Middleware.checkID, Controllers.statement)

app.get('/balance', Middleware.checkID, Controllers.balance)

app.post('/deposit', Middleware.checkID, Controllers.deposit)

app.post('/withdraw', Middleware.checkID, Controllers.withdraw)



const port = 1992
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
