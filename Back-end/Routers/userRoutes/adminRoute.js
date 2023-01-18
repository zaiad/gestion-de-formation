const router = require('express').Router()
const adminController = require('../../controllers/userControllers/adminController')
const tryCatch = require('../../middlewares/tryCatch')
const { userPermission } = require('../../middlewares/permission')


router.post('/add-employe', tryCatch(adminController.addEmploye))
router.get('/employe', tryCatch(adminController.getDataUser))
router.get('/statistique', tryCatch(adminController.Statistique))

module.exports = router