"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fundController_1 = require("../controllers/fundController");
const router = express_1.default.Router();
router.get('/', fundController_1.getFundsController);
router.put('/:fundId/nav', fundController_1.updateNavController);
exports.default = router;
//# sourceMappingURL=fundRoute.js.map