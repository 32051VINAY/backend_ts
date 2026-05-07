const express = require('express');
const router = express.Router();
const {
    getSipController,
    processSipController,
    getSipTransactionsController
} = require('../controllers/sipController');

router.get('/:sipId', getSipController);

router.post(
    '/:sipId/process',
    processSipController
);

router.get(
    '/:sipId/transactions',
    getSipTransactionsController
);

module.exports = router;