const useFul = require('./useFulFunctions')

function checkIfThereIsCPF(req, res, next){
    const { name, cpf } = req.body

    if(!name || !cpf){
        return res.status(400).json({
            message: "preencha todos os dados"
        })
    }

    const userExists = useFul.getCustomer('cpf', cpf).exists
    

    if(userExists){
        return res.status(401).json({
            message: "Cliente já tem conta em nosso banco!"
        })
    }

    next()
}

function checkID(req, res, next){
    const { id } = req.headers

    try {
        const customer = useFul.getCustomer('id', id).customer

        if(!customer){
            return res.status(400).json({
                message: 'Cliente não existente'
            })
        }

        req.customer = customer

        next()
    } catch (e) {
        res.status(500).json({
            message: "Problema no servidor!"
        })
    }
}

module.exports = {
    checkIfThereIsCPF,
    checkID
}