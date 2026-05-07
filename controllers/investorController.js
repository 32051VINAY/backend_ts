const {loginUser} = require('../models/investorModel')
const {signjwt} = require('../utility/authManager')
const {getInvestor,getInvestorHoldings,getInvestorNetworth} = require('../models/investorModel')



const login = (req,res)=>{
    const {email,password} = req.body
    const user = loginUser(email,password)
    if(!user){
        return res.send("no user found")
    }
    const token = signjwt({
        email:user.email
})
return res.json({
    token:token
})
}

const getInvestorController = async (req, res) => {

    try {

        const { investorId } = req.params;

        const investor = await getInvestor(investorId);

        if (!investor) {
            return res.status(404).json({
                message: "Investor not found"
            });
        }

        return res.json(investor);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

const getHoldingsController = async (req, res) => {

    try {

        const { investorId } = req.params;

        const holdings = await getInvestorHoldings(investorId);

        return res.json(holdings);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

const getNetworthController = async (req, res) => {

    try {

        const { investorId } = req.params;

        const networth = await getInvestorNetworth(investorId);

        return res.json(networth);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};


module.exports = {
    login,
    getInvestorController,
    getHoldingsController,
    getNetworthController
}