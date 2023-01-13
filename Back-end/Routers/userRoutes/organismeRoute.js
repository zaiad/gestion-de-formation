const router = require('express').Router()
const organismController = require('../../controllers/userControllers/organismeController')
const tryCatch = require('../../middlewares/tryCatch')
const {userPermission} = require('../../middlewares/permission')


router.get('/organisme',userPermission, tryCatch(organismController.getOrganisme))
router.post('/add-organisme',userPermission, tryCatch(organismController.addOrganisme))
router.put('/update-organisme/:id',userPermission, tryCatch(organismController.updateOrganism))
router.delete('/delete-organisme/:id',userPermission, tryCatch(organismController.deleteOrganisme))


module.exports = router