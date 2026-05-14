"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvestorNetworth = exports.getInvestorHoldings = exports.getInvestor = exports.loginUser = void 0;
const dbManager_1 = require("../utility/dbManager");
const users = [{
        name: 'sip',
        email: 'sip@gmail.com',
        password: 'sip123',
        role: 'investor'
    }];
const loginUser = (email, password) => {
    const userIndex = users.findIndex(u => u.email === email && u.password === password);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], loggedIn: true };
        return users[userIndex];
    }
    return null;
};
exports.loginUser = loginUser;
const getInvestor = (investorId) => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.get(`SELECT * FROM investor WHERE investor_id = ?`, [investorId], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};
exports.getInvestor = getInvestor;
const getInvestorHoldings = (investorId) => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.all(`SELECT
          mf.fund_name,
          SUM(t.units_allocated) as total_units,
          mf.latest_nav,
          ROUND(SUM(t.units_allocated) * mf.latest_nav, 2) as current_value
      FROM transactions t
      JOIN mutual_funds mf ON t.fund_id = mf.fund_id
      WHERE t.investor_id = ?
      GROUP BY t.fund_id`, [investorId], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};
exports.getInvestorHoldings = getInvestorHoldings;
const getInvestorNetworth = (investorId) => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.get(`SELECT ROUND(SUM(total_value), 2) as networth
      FROM (
          SELECT SUM(t.units_allocated) * mf.latest_nav as total_value
          FROM transactions t
          JOIN mutual_funds mf ON t.fund_id = mf.fund_id
          WHERE t.investor_id = ?
          GROUP BY t.fund_id
      )`, [investorId], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};
exports.getInvestorNetworth = getInvestorNetworth;
//# sourceMappingURL=investorModel.js.map