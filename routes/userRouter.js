const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)
router.post('/register/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot',userCtrl.forgotPassword)
router.post('/reset', auth,  userCtrl.resetPassword)
router.get('/user_infor', auth, userCtrl.getUserInfor)
module.exports = router;