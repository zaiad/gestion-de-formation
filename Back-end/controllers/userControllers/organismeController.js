const db = require('../../models')

const Organisme = db.organisme


const getOrganisme = async(req, res) => {
    const organisme = await Organisme.find()
    res.json({organisme})
}

const addOrganisme = async(req, res) => {
    const {name, ville, address, phone} = req.body
    if(!name || !ville || !address || !phone) throw Error('fill all fields')
    const add_organisme = await Organisme.create({
        name, ville, address, phone
    })
    res.send('organisme is created')
}

const updateOrganism = async(req, res) => {
    const id = req.params.id
    const {name, ville, address, phone} = req.body
    const find_organisme = await Organisme.findById(id)
    if(!find_organisme) res.send('This organisme is not found')
    res.send('yess')

}




module.exports = {
    getOrganisme,
    addOrganisme,
    updateOrganism
}