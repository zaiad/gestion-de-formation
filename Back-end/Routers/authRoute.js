const router = require('express').Router()
const authController = require('../controllers/authControllers/authController')
const tryCatch = require('../middlewares/tryCatch')
const { userPermission, authPermission} = require('../middlewares/permission')


router.post('/login',authPermission, tryCatch(authController.login))
router.get('/logout', tryCatch(authController.logout))






module.exports = router