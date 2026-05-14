"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authManager_1 = require("../utility/authManager");
const investorController_1 = require("../controllers/investorController");
const router = express_1.default.Router();
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'No token. Please login.' });
    }
    const tk = (0, authManager_1.verifytoken)(token);
    if (!tk || tk instanceof Error || tk.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = tk;
    next();
};
router.post('/login', investorController_1.login);
router.get('/', authMiddleware, investorController_1.getInvestorController);
router.get('/:investorId', authMiddleware, investorController_1.getInvestorController);
router.get('/:investorId/holdings', authMiddleware, investorController_1.getHoldingsController);
router.get('/:investorId/networth', authMiddleware, investorController_1.getNetworthController);
exports.default = router;
//# sourceMappingURL=investorRoute.js.map