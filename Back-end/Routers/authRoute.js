const router = require('express').Router()
const authController = require('../controllers/authControllers/authController')
const tryCatch = require('../middlewares/tryCatch')


router.post('/register', tryCatch(authController.register))
router.post('/login', tryCatch(authController.login))
router.get('/verify-email/:token', tryCatch(authController.verfyEmail))
router.get('/logout', tryCatch(authController.logout))






module.exports = router