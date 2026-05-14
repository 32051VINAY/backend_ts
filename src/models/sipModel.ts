import { db } from '../utility/dbManager';

export interface Sip {
  sip_id: number;
  investor_id: number;
  fund_id: number;
  sip_amount: number;
  start_date: string;
  next_installment_date: string;
  status: string;
}

export interface SipTransaction {
  transaction_id: number;
  fund_name: string;
  amount: number;
  nav_at_purchase: number;
  units_allocated: number;
  transaction_date: string;
  status: string;
}

export const getSipById = (sipId: number): Promise<Sip | undefined> => {
  return new Promise((resolve, reject) => {
    db.get(
      `select * from sips where sip_id=?`,
      [sipId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row as Sip);
      }
    );
  });
};

export const processSip = (sipId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      db.get(
        `SELECT * FROM sips WHERE sip_id = ?`, [sipId],
        (err, sip: Sip) => {
          if (err || !sip) {
            db.run("ROLLBACK");
            return reject(err || new Error("SIP not found"));
          }

          db.get(
            `SELECT * FROM mutual_funds WHERE fund_id = ?`, [sip.fund_id],
            (err, fund: any) => {
              if (err || !fund) {
                db.run("ROLLBACK");
                return reject(err || new Error("Fund not found"));
              }

              const units = sip.sip_amount / fund.latest_nav;
              const transactionId = Date.now();

              db.run(
                `INSERT INTO transactions(
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
                VALUES (?, ?, ?, ?, ?, ?, ?, DATE('now'), 'SIP', 'SUCCESS')`,
                [
                  transactionId,
                  sip.sip_id,
                  sip.investor_id,
                  sip.fund_id,
                  sip.sip_amount,
                  fund.latest_nav,
                  units
                ],
                function (this: any, err) {
                  if (err) {
                    db.run("ROLLBACK");
                    reject(err);
                  } else {
                    db.run("COMMIT", (commitErr) => {
                      if (commitErr) {
                        db.run("ROLLBACK");
                        reject(commitErr);
                      } else {
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
                }
              );
            }
          );
        });
    });
  });
};

export const getSipTransactions = (sipId: number): Promise<SipTransaction[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT
          t.transaction_id,
          mf.fund_name,
          t.amount,
          t.nav_at_purchase,
          t.units_allocated,
          t.transaction_date,
          t.status
      FROM transactions t
      JOIN mutual_funds mf ON t.fund_id = mf.fund_id
      WHERE t.sip_id = ?`,
      [sipId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows as SipTransaction[]);
      }
    );
  });
};
