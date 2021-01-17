const express = require('express');
const router = express.Router();

const uploadImage = require('../middleware/uploadImage');

const uploadCtrl = require('../controllers/uploadCtrl');

const auth = require('../middleware/auth');

router.route('/upload_avatar').post(uploadImage, auth, uploadCtrl.uploadAvatar);

module.exports = router;
