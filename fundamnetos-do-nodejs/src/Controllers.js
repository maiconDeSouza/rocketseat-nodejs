const fs = require('fs')
const path = require('path')

const pathDB = path.join(__dirname, 'DB', 'customers.json')


const customers = require(pathDB)
const useFul = require('./useFulFunctions')



function createNewCustomer(req, res){
    const { name, cpf } = req.body
    const newCustomers =  useFul.createAccount(name, cpf)

    try {
        customers.push(newCustomers)

        fs.writeFileSync(pathDB, JSON.stringify(customers, null, 2))

        res.status(201).json({
            message: "Conta Criada com sucesso!",
            id: newCustomers.id
        })
    } catch (e) {
        res.status(500).json({
            message: "Problema no servidor!",
        })
    }
}

function statement(req, res){
    const { id } = req.params

    try {
        const customer = useFul.getCustomer('id', id).customer

        if(!customer){
            return res.status(400).json({
                message: 'Cliente não existente'
            })
        }

        res.status(200).json({
            name: customer.name,
            statement: customer.statement
        })
    } catch (e) {
        res.status(500).json({
            message: "Problema no servidor!"
        })
    }

    
}

module.exports = {
    createNewCustomer,
    statement
}