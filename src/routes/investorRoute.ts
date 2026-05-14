import express, { Request, Response, NextFunction } from 'express';
import { verifytoken } from '../utility/authManager';
import { getInvestorController, getHoldingsController, getNetworthController, login } from '../controllers/investorController';

const router = express.Router();

// Extending Request type to include user
interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): any => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: 'No token. Please login.' });
  }
  const tk = verifytoken(token);
  if (!tk || tk instanceof Error || (tk as any).name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  req.user = tk;
  next();
};

router.post('/login', login);
router.get('/', authMiddleware, getInvestorController);
router.get('/:investorId', authMiddleware, getInvestorController);
router.get('/:investorId/holdings', authMiddleware, getHoldingsController);
router.get('/:investorId/networth', authMiddleware, getNetworthController);

export default router;
