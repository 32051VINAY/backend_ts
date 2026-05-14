"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sipController_1 = require("../controllers/sipController");
const router = express_1.default.Router();
router.get('/:sipId', sipController_1.getSipController);
router.post('/:sipId/process', sipController_1.processSipController);
router.get('/:sipId/transactions', sipController_1.getSipTransactionsController);
exports.default = router;
//# sourceMappingURL=sipRoute.js.map