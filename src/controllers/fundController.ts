import { Request, Response } from 'express';
import { getAllFunds, updateFundNav, getFundById } from '../models/fundModel';

export const getFundsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const funds = await getAllFunds();
    return res.json(funds);
  } catch (err: any) {
    return res.status(500).json({
      message: err.message
    });
  }
};

export const updateNavController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fundId } = req.params;
    const { nav } = req.body;

    if (!nav) {
      return res.status(400).json({
        message: "NAV is required"
      });
    }

    const fund = await getFundById(Number(fundId));

    if (!fund) {
      return res.status(404).json({
        message: "Fund not found"
      });
    }

    const result = await updateFundNav(Number(fundId), Number(nav));

    return res.json({
      message: "NAV updated successfully",
      result
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message
    });
  }
};
