const router = require('express').Router()
const employeController = require('../../controllers/userControllers/employeController')
const tryCatch = require('../../middlewares/tryCatch')


router.get('/employe', tryCatch(employeController.getEmploye))
router.post('/add-employe', tryCatch(employeController.addEmploye))
router.put('/update-employe/:id', tryCatch(employeController.updateEmploye))

module.exports = router