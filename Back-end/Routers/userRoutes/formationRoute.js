const router = require('express').Router()
const organismController = require('../../controllers/userControllers/formationController')
const upload = require('../../outil/uploadImage')
const tryCatch = require('../../middlewares/tryCatch')


router.post('/add-formation', upload.single('image') ,tryCatch(organismController.addFormation))










module.exports = router