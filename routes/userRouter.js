const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)
router.post('/register/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot',userCtrl.forgotPassword)
router.post('/reset', auth,  userCtrl.resetPassword)
router.get('/user_infor', auth, userCtrl.getUserInfor)
router.put('/user_update', auth, userCtrl.updateUser)
router.get('/logout',userCtrl.logout) 
router.post("/google_login", userCtrl.googleLogin)

router.put('/addcart',auth, userCtrl.addCart)

//Admin router
router.get('/admin/all_infor', auth ,authAdmin , userCtrl.getUsersAllInfor)
router.patch('/admin/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
router.delete('/admin/delete/:id', auth, authAdmin, userCtrl.deleteUser)
module.exports = router;