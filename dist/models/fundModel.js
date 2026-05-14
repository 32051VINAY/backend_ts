"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFundById = exports.updateFundNav = exports.getAllFunds = void 0;
const dbManager_1 = require("../utility/dbManager");
const getAllFunds = () => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.all(`SELECT * FROM mutual_funds`, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};
exports.getAllFunds = getAllFunds;
const updateFundNav = (fundId, nav) => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.run(`UPDATE mutual_funds SET latest_nav = ? WHERE fund_id = ?`, [nav, fundId], function (err) {
            if (err)
                reject(err);
            else
                resolve({ updated: this.changes > 0 });
        });
    });
};
exports.updateFundNav = updateFundNav;
const getFundById = (fundId) => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.get(`SELECT * FROM mutual_funds WHERE fund_id = ?`, [fundId], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};
exports.getFundById = getFundById;
//# sourceMappingURL=fundModel.js.map