import { db } from '../utility/dbManager';

export interface Fund {
  fund_id: number;
  fund_name: string;
  latest_nav: number;
  // add any other columns as needed
}

export const getAllFunds = (): Promise<Fund[]> => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM mutual_funds`, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Fund[]);
    });
  });
};

export const updateFundNav = (fundId: number, nav: number): Promise<{ updated: boolean }> => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE mutual_funds SET latest_nav = ? WHERE fund_id = ?`,
      [nav, fundId],
      function (err) {
        if (err) reject(err);
        else resolve({ updated: this.changes > 0 });
      }
    );
  });
};

export const getFundById = (fundId: number): Promise<Fund | undefined> => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM mutual_funds WHERE fund_id = ?`, [fundId], (err, row) => {
      if (err) reject(err);
      else resolve(row as Fund);
    });
  });
};
