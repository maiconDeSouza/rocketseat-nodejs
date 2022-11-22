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

module.exports = {
    checkIfThereIsCPF
}