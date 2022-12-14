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

function editCustomer(req, res){
    const { customer } = req
    const { name } = req.body

    try {
        if(!name){
            return res.status(401).json({
                message: "Edição inválida"
            })
        }
    
        const newCustomers = customers.map(customerList => {
            if(customerList.id === customer.id){
                customerList.name = name
                return  customerList
            }
            return customerList
        })
    
        fs.writeFileSync(pathDB, JSON.stringify(newCustomers, null, 2))
    
        res.status(200).json({
            message: "Usuário Atualizado com Sucesso!"
        })
    } catch (e) {
        res.status(500).json({
            message: "Problema no servidor!",
        })
    }
}

function statement(req, res){
    const { customer } = req
    
    try {
        res.status(200).json({
            name: customer.name,
            statement: customer.statement
        })
    } catch (e) {
        res.status(500).json({
            message: "Problema no servidor!",
        })
    }
}

function statementDate(req, res){
    const { date } = req.body
    const { customer } = req
    const statement = customer.statement

    try {
        const filterStatement = useFul.filterStatementDate(statement, date)

        if(!Array.isArray(filterStatement) || filterStatement.length === 0){
            res.status(400).json({
                message: "Extrado não encontrado!"
            })
        }

        res.status(200).json({
        filterStatement
    })
    } catch (e) {
        res.status(500).json({
            message: "Problema no servidor!"
        })
    }
}

function balance(req, res){
    const { customer } = req

    const length = customer.statement.length
    const balance = customer.statement[length - 1].totalAmount

    res.status(200).json({
        balance
    })
}

function deposit(req, res){
    const { customer } = req
    const { operation, amount, description } = req.body

    if(operation !== 'deposit'){
        return res.status(400).json({
            message: "Operação Invalida"
        })
    }

    try {
        const totalAmount = customer.statement[customer.statement.length - 1].totalAmount
        
        const newOperation = useFul.createOperation(operation, amount, totalAmount, description)

        customer.statement.push(newOperation)

        fs.writeFileSync(pathDB, JSON.stringify(customers, null, 2))

        res.status(201).json({
            operation: newOperation
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

function withdraw(req, res){
    const { customer } = req
    const { operation, amount, description } = req.body

    if(operation !== 'withdraw'){
        return res.status(400).json({
            message: "Operação Invalida"
        })
    }

    try {
        const totalAmount = customer.statement[customer.statement.length - 1].totalAmount

        if(totalAmount < amount){
            return res.status(401).json({
                message: `Saldo insuficiente`,
                totalAmount
            })
        }
        
        const newOperation = useFul.createOperation(operation, amount, totalAmount, description)

        customer.statement.push(newOperation)

        fs.writeFileSync(pathDB, JSON.stringify(customers, null, 2))

        res.status(201).json({
            operation: newOperation
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

function deleteCustomer(req, res){
    const { customer } = req
    const { del } = req.body

    if(!del){
        return res.status(401).json({
            message: `Exclusão não pode ser concluida`
        })
    }

    try {
        const newCustomers = customers.filter(customerList => {
            return customerList.id !== customer.id
        })

        fs.writeFileSync(pathDB, JSON.stringify(newCustomers, null, 2))

        res.status(200).json({
            message: "Customer Deletado com sucesso!"
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}



module.exports = {
    createNewCustomer,
    statement,
    statementDate,
    deposit,
    withdraw,
    balance,
    editCustomer,
    deleteCustomer
}

//createOperation(operation, amount, totalAmount, description)