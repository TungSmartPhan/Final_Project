const router = require('express').Router();
const upload = require('../middleware/upload')
const uploadImage = require('../middleware/uploadImage')
const auth = require('../middleware/auth')
const uploadCtrl = require('../controllers/uploadCtrl')

router.post('/avatar_upload',  upload, auth, uploadCtrl.uploadAvatar)

module.exports = router; 