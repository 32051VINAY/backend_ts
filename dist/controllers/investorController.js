"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworthController = exports.getHoldingsController = exports.getInvestorController = exports.login = void 0;
const investorModel_1 = require("../models/investorModel");
const authManager_1 = require("../utility/authManager");
const login = (req, res) => {
    const { email, password } = req.body;
    const user = (0, investorModel_1.loginUser)(email, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = { email: user.email };
    const tokenResult = (0, authManager_1.signjwt)(payload);
    if (tokenResult instanceof Error) {
        return res.status(500).json({ message: 'Error signing token' });
    }
    res.cookie('token', tokenResult, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: 'lax',
        maxAge: 5 * 60 * 60 * 1000 // 5 hours
    });
    return res.json({
        message: 'Login successful',
        email: user.email,
        token: tokenResult,
        // investor_id: user.investor_id // investor_id was missing in the dummy users array but expected in response
    });
};
exports.login = login;
const getInvestorController = async (req, res) => {
    try {
        const { investorId } = req.params;
        const investor = await (0, investorModel_1.getInvestor)(Number(investorId));
        if (!investor) {
            return res.status(404).json({ message: 'Investor not found' });
        }
        return res.json({
            id: investor.investor_id,
            name: investor.full_name, // Casting to any because I'm not sure of all fields yet
            email: investor.email,
            phone_no: investor.phone_no,
            pancard_no: investor.pancard_no,
            address: investor.address
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getInvestorController = getInvestorController;
const getHoldingsController = async (req, res) => {
    try {
        const { investorId } = req.params;
        const holdings = await (0, investorModel_1.getInvestorHoldings)(Number(investorId));
        return res.json(holdings);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getHoldingsController = getHoldingsController;
const getNetworthController = async (req, res) => {
    try {
        const { investorId } = req.params;
        const networth = await (0, investorModel_1.getInvestorNetworth)(Number(investorId));
        return res.json(networth);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getNetworthController = getNetworthController;
//# sourceMappingURL=investorController.js.map