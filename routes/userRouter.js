const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl')

router.post('/register', userCtrl.register)
router.post('/register/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot',userCtrl.forgotPassword)
module.exports = router;