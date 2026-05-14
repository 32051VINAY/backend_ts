"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNavController = exports.getFundsController = void 0;
const fundModel_1 = require("../models/fundModel");
const getFundsController = async (req, res) => {
    try {
        const funds = await (0, fundModel_1.getAllFunds)();
        return res.json(funds);
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
exports.getFundsController = getFundsController;
const updateNavController = async (req, res) => {
    try {
        const { fundId } = req.params;
        const { nav } = req.body;
        if (!nav) {
            return res.status(400).json({
                message: "NAV is required"
            });
        }
        const fund = await (0, fundModel_1.getFundById)(Number(fundId));
        if (!fund) {
            return res.status(404).json({
                message: "Fund not found"
            });
        }
        const result = await (0, fundModel_1.updateFundNav)(Number(fundId), Number(nav));
        return res.json({
            message: "NAV updated successfully",
            result
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
exports.updateNavController = updateNavController;
//# sourceMappingURL=fundController.js.map