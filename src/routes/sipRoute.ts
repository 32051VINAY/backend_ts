import express from 'express';
import {
  getSipController,
  processSipController,
  getSipTransactionsController
} from '../controllers/sipController';

const router = express.Router();

router.get('/:sipId', getSipController);
router.post('/:sipId/process', processSipController);
router.get('/:sipId/transactions', getSipTransactionsController);

export default router;
