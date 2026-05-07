const {
    getSipById,
    processSip,
    getSipTransactions
} = require('../models/sipModel');

const getSipController = async (req, res) => {

    try {

        const { sipId } = req.params;

        const sip = await getSipById(sipId);

        if (!sip) {

            return res.status(404).json({
                message: "SIP not found"
            });

        }

        return res.json(sip);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

const processSipController = async (req, res) => {

    try {

        const { sipId } = req.params;

        const result = await processSip(sipId);

        return res.json({
            message: "SIP processed successfully",
            transaction: result
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

const getSipTransactionsController = async (
    req,
    res
) => {

    try {

        const { sipId } = req.params;

        const transactions =
            await getSipTransactions(sipId);

        return res.json(transactions);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getSipController,
    processSipController,
    getSipTransactionsController
};