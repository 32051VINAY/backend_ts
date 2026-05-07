const {getAllFunds,updateFundNav,getFundById} = require('../models/fundModel');


const getFundsController = async (req, res) => {

    try {

        const funds = await getAllFunds();

        return res.json(funds);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

const updateNavController = async (req, res) => {

    try {

        const { fundId } = req.params;

        const { nav } = req.body;

        if (!nav) {

            return res.status(400).json({
                message: "NAV is required"
            });

        }

        const fund = await getFundById(fundId);

        if (!fund) {

            return res.status(404).json({
                message: "Fund not found"
            });

        }

        const result = await updateFundNav(
            fundId,
            nav
        );

        return res.json({
            message: "NAV updated successfully",
            result
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getFundsController,
    updateNavController
};