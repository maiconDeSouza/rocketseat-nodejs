const { v4: uuidv4 } = require('uuid')
const path = require('path')
const pathDB = path.join(__dirname, 'DB', 'customers.json')
const customers = require(pathDB)

function createAccount(name, cpf){
    return {
        id: uuidv4(),
        name,
        cpf,
        statement: [{
            operation: 'creation',
            amount: 0,
            totalAmount: 0,
            destription: 'Conta criada',
            operationDate: new Date().toLocaleString('pt-BR', {timeZone: 'UTC'})
        }]
    }
}


function getCustomer(searchItem, valueToCompare){
    const customer = customers.find(customer => customer[searchItem] === valueToCompare)

    if(customer){
        return {
            exists: true,
            customer
        }
    } else {
        return {
            exists: false,
            customer: ''
        }
    }
}

function createOperation(operation, amount, totalAmount, description){
    if(typeof amount !== 'number' || typeof totalAmount !== 'number'){
        throw 'Amount ou Total Amount percisam ser números'
    }

    if(operation === 'deposit' && amount >= 0){
        return {
            operation,
            amount,
            totalAmount: totalAmount + amount,
            description,
            operationDate: new Date().toLocaleString('pt-BR', {timeZone: 'UTC'})
        }
    } 

    if(operation === 'withdraw' && amount > 0){
        return {
            operation,
            amount,
            totalAmount: totalAmount - amount,
            description,
            operationDate: new Date().toLocaleString('pt-BR', {timeZone: 'UTC'})
        }
    }

    if(operation !== 'deposit' || operation !== 'withdraw'){
        throw 'Operação Invalida'
    }
}

function filterStatementDate(statement, date){
    const filterStatement = statement.filter(item => {
        const filter = item.operationDate.split(" ")[0]

        if(filter === date){
            return item
        }
    })

    return filterStatement
}

module.exports = {
    createAccount,
    getCustomer,
    createOperation,
    filterStatementDate
}