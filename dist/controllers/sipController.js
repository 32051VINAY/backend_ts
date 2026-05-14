"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSipTransactionsController = exports.processSipController = exports.getSipController = void 0;
const sipModel_1 = require("../models/sipModel");
const getSipController = async (req, res) => {
    try {
        const { sipId } = req.params;
        const sip = await (0, sipModel_1.getSipById)(Number(sipId));
        if (!sip) {
            return res.status(404).json({
                message: "SIP not found"
            });
        }
        return res.json(sip);
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
exports.getSipController = getSipController;
const processSipController = async (req, res) => {
    try {
        const { sipId } = req.params;
        const result = await (0, sipModel_1.processSip)(Number(sipId));
        return res.json({
            message: "SIP processed successfully",
            transaction: result
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
exports.processSipController = processSipController;
const getSipTransactionsController = async (req, res) => {
    try {
        const { sipId } = req.params;
        const transactions = await (0, sipModel_1.getSipTransactions)(Number(sipId));
        return res.json(transactions);
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
exports.getSipTransactionsController = getSipTransactionsController;
//# sourceMappingURL=sipController.js.map