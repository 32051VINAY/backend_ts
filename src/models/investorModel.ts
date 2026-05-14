import { db } from '../utility/dbManager';

export interface User {
  name: string;
  email: string;
  password?: string;
  role: string;
  loggedIn?: boolean;
}

export interface Investor {
  investor_id: number;
  name: string;
  email: string;
  // add other fields if they exist in the DB
}

export interface Holding {
  fund_name: string;
  total_units: number;
  latest_nav: number;
  current_value: number;
}

const users: User[] = [{
  name: 'sip',
  email: 'sip@gmail.com',
  password: 'sip123',
  role: 'investor'
}];

export const loginUser = (email: string, password: string): User | null => {
  const userIndex = users.findIndex(u => u.email === email && u.password === password);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], loggedIn: true };
    return users[userIndex];
  }
  return null;
};

export const getInvestor = (investorId: number): Promise<Investor | undefined> => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM investor WHERE investor_id = ?`,
      [investorId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row as Investor);
      }
    );
  });
};

export const getInvestorHoldings = (investorId: number): Promise<Holding[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT
          mf.fund_name,
          SUM(t.units_allocated) as total_units,
          mf.latest_nav,
          ROUND(SUM(t.units_allocated) * mf.latest_nav, 2) as current_value
      FROM transactions t
      JOIN mutual_funds mf ON t.fund_id = mf.fund_id
      WHERE t.investor_id = ?
      GROUP BY t.fund_id`,
      [investorId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Holding[]);
      }
    );
  });
};

export const getInvestorNetworth = (investorId: number): Promise<{ networth: number } | undefined> => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT ROUND(SUM(total_value), 2) as networth
      FROM (
          SELECT SUM(t.units_allocated) * mf.latest_nav as total_value
          FROM transactions t
          JOIN mutual_funds mf ON t.fund_id = mf.fund_id
          WHERE t.investor_id = ?
          GROUP BY t.fund_id
      )`,
      [investorId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row as { networth: number });
      }
    );
  });
};
