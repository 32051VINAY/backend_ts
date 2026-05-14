"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSipTransactions = exports.processSip = exports.getSipById = void 0;
const dbManager_1 = require("../utility/dbManager");
const getSipById = (sipId) => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.get(`select * from sips where sip_id=?`, [sipId], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};
exports.getSipById = getSipById;
const processSip = (sipId) => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.serialize(() => {
            dbManager_1.db.run("BEGIN TRANSACTION");
            dbManager_1.db.get(`SELECT * FROM sips WHERE sip_id = ?`, [sipId], (err, sip) => {
                if (err || !sip) {
                    dbManager_1.db.run("ROLLBACK");
                    return reject(err || new Error("SIP not found"));
                }
                dbManager_1.db.get(`SELECT * FROM mutual_funds WHERE fund_id = ?`, [sip.fund_id], (err, fund) => {
                    if (err || !fund) {
                        dbManager_1.db.run("ROLLBACK");
                        return reject(err || new Error("Fund not found"));
                    }
                    const units = sip.sip_amount / fund.latest_nav;
                    const transactionId = Date.now();
                    dbManager_1.db.run(`INSERT INTO transactions(
                    transaction_id,
                    sip_id,
                    investor_id,
                    fund_id,
                    amount,
                    nav_at_purchase,
                    units_allocated,
                    transaction_date,
                    transaction_type,
                    status
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, DATE('now'), 'SIP', 'SUCCESS')`, [
                        transactionId,
                        sip.sip_id,
                        sip.investor_id,
                        sip.fund_id,
                        sip.sip_amount,
                        fund.latest_nav,
                        units
                    ], function (err) {
                        if (err) {
                            dbManager_1.db.run("ROLLBACK");
                            reject(err);
                        }
                        else {
                            dbManager_1.db.run("COMMIT", (commitErr) => {
                                if (commitErr) {
                                    dbManager_1.db.run("ROLLBACK");
                                    reject(commitErr);
                                }
                                else {
                                    resolve({
                                        transaction_id: transactionId, // using transactionId since this.lastID might not be correct for custom IDs
                                        sip_id: sip.sip_id,
                                        amount: sip.sip_amount,
                                        nav: fund.latest_nav,
                                        units: units
                                    });
                                }
                            });
                        }
                    });
                });
            });
        });
    });
};
exports.processSip = processSip;
const getSipTransactions = (sipId) => {
    return new Promise((resolve, reject) => {
        dbManager_1.db.all(`SELECT
          t.transaction_id,
          mf.fund_name,
          t.amount,
          t.nav_at_purchase,
          t.units_allocated,
          t.transaction_date,
          t.status
      FROM transactions t
      JOIN mutual_funds mf ON t.fund_id = mf.fund_id
      WHERE t.sip_id = ?`, [sipId], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};
exports.getSipTransactions = getSipTransactions;
//# sourceMappingURL=sipModel.js.map