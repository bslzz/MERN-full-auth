const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/userCtrl');

const authAdmin = require('../middleware/authAdmin');

router.route('/register').post(userCtrl.register);

router.route('/activation').post(userCtrl.activateEmail);

router.route('/login').post(userCtrl.login);

router.route('/refresh_token').post(userCtrl.getAccessToken);

router.route('/forgot').post(userCtrl.forgotPassword);

router.route('/reset').post(auth, userCtrl.resetPassword);

router.route('/infor').get(auth, userCtrl.getUserInfo);

router.route('/all_infor').get(auth, authAdmin, userCtrl.getUsersAllInfo);

router.route('/logout').get(userCtrl.logOut);

router.route('/update').patch(auth, userCtrl.updateUser);

router
  .route('/update_role/:id')
  .patch(auth, authAdmin, userCtrl.updateUsersRole);

router.route('/delete/:id').delete(auth, authAdmin, userCtrl.deleteUser);

module.exports = router;
