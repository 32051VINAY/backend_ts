"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
exports.db = new sqlite3_1.default.Database('C:\\Users\\sivat\\Downloads\\sqlite-tools-win-x64-3530100\\sip_tracker', (error) => {
    if (error) {
        console.log(error.message);
    }
    else {
        console.log('Successfully connected to db');
    }
});
//# sourceMappingURL=dbManager.js.map