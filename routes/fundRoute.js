const express = require('express');
const router = express.Router();
const {getFundsController,updateNavController} = require('../controllers/fundController');


router.get('/', getFundsController);
router.put('/:fundId/nav',updateNavController);

module.exports = router;