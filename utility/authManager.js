const jwt = require('jsonwebtoken')

const secret = "dssdfgkfhhgcdzkljjhj"

const signjwt = (payload)=>{
    try{
        const token = jwt.sign(payload,secret,{expiresIn:'5hr'})
        return token
    }catch(err){
        return err
    }
}

const verifytoken = (token)=>{
    try{
        const tk = jwt.verify(token,secret)
        return tk
    }catch(err){
        return err
    }
}

module.exports = {
    signjwt,
    verifytoken
}