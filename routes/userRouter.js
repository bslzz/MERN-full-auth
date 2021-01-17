const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');

router.route('/register').post(userCtrl.register);

module.exports = router;
