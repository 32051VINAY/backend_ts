import { Request, Response } from 'express';
import { loginUser, getInvestor, getInvestorHoldings, getInvestorNetworth, User } from '../models/investorModel';
import { signjwt, TokenPayload } from '../utility/authManager';

export const login = (req: Request, res: Response): any => {
  const { email, password } = req.body;
  const user = loginUser(email, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload: TokenPayload = { email: user.email };
  const tokenResult = signjwt(payload);

  if (tokenResult instanceof Error) {
    return res.status(500).json({ message: 'Error signing token' });
  }

  res.cookie('token', tokenResult, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'lax',
    maxAge: 5 * 60 * 60 * 1000 // 5 hours
  });

  return res.json({
    message: 'Login successful',
    email: user.email,
    token: tokenResult,
    // investor_id: user.investor_id // investor_id was missing in the dummy users array but expected in response
  });
};

export const getInvestorController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { investorId } = req.params;
    const investor = await getInvestor(Number(investorId));

    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    return res.json({
      id: investor.investor_id,
      name: (investor as any).full_name, // Casting to any because I'm not sure of all fields yet
      email: investor.email,
      phone_no: (investor as any).phone_no,
      pancard_no: (investor as any).pancard_no,
      address: (investor as any).address
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getHoldingsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { investorId } = req.params;
    const holdings = await getInvestorHoldings(Number(investorId));
    return res.json(holdings);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getNetworthController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { investorId } = req.params;
    const networth = await getInvestorNetworth(Number(investorId));
    return res.json(networth);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
