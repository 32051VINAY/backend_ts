import { Request, Response } from 'express';
import { getSipById, processSip, getSipTransactions } from '../models/sipModel';

export const getSipController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { sipId } = req.params;
    const sip = await getSipById(Number(sipId));

    if (!sip) {
      return res.status(404).json({
        message: "SIP not found"
      });
    }

    return res.json(sip);
  } catch (err: any) {
    return res.status(500).json({
      message: err.message
    });
  }
};

export const processSipController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { sipId } = req.params;
    const result = await processSip(Number(sipId));

    return res.json({
      message: "SIP processed successfully",
      transaction: result
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message
    });
  }
};

export const getSipTransactionsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { sipId } = req.params;
    const transactions = await getSipTransactions(Number(sipId));
    return res.json(transactions);
  } catch (err: any) {
    return res.status(500).json({
      message: err.message
    });
  }
};
