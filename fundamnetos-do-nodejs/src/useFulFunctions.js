const { v4: uuidv4 } = require('uuid')
const path = require('path')
const pathDB = path.join(__dirname, 'DB', 'customers.json')
const customers = require(pathDB)

function createAccount(name, cpf){
    return {
        id: uuidv4(),
        name,
        cpf,
        statement: []
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

module.exports = {
    createAccount,
    getCustomer
}