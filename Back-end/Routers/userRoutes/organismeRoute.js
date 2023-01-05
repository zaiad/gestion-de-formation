const router = require('express').Router()
const organismController = require('../../controllers/userControllers/organismeController')
const tryCatch = require('../../middlewares/tryCatch')


router.get('/organisme', tryCatch(organismController.getOrganisme))
router.post('/add-organisme', tryCatch(organismController.addOrganisme))
router.put('/update-organisme/:id', tryCatch(organismController.updateOrganism))


module.exports = router