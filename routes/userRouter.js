const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');

router.route('/register').post(userCtrl.register);
router.route('/activation').post(userCtrl.activateEmail);
router.route('/login').post(userCtrl.login);

module.exports = router;
