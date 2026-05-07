const express = require('express')
const router = express.Router()
const {verifytoken} = require('../utility/authManager')
const {getInvestorController,getHoldingsController,getNetworthController,login} = require('../controllers/investorController')
const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization

    const tk = verifyToken(token)
    if(!tk){
        return res.send("Authorization failed")
    }
    req.user = tk
    next()
}

router.post('/login',login)
router.get('/:investorId', getInvestorController);
router.get('/:investorId/holdings',getHoldingsController);
router.get('/:investorId/networth',getNetworthController);


module.exports = router
