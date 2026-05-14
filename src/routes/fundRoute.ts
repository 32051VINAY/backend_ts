import express from 'express';
import { getFundsController, updateNavController } from '../controllers/fundController';

const router = express.Router();

router.get('/', getFundsController);
router.put('/:fundId/nav', updateNavController);

export default router;
