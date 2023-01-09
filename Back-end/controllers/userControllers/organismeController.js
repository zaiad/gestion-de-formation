const db = require('../../models')

const Organisme = db.organisme


const getOrganisme = async(req, res) => {
    const organisme = await Organisme.find()
    res.json({organisme})
}

const addOrganisme = async(req, res) => {
    const {name, ville, address, phone} = req.body
    if(!name || !ville || !address || !phone) throw Error('fill all fields')
    const find_organisme = await Organisme.findOne({phone})
    if(find_organisme) {
        res.send(`You can't add this number ${phone}`)
    } else {
        const add_organisme = await Organisme.create({
            name, ville, address, phone
        })
        res.send('organisme is created')
    }

}

const updateOrganism = async(req, res) => {
    const id = req.params.id
    const {name, ville, address, phone} = req.body
    if(!name || !ville || !address || !phone) throw Error('fill all fields')
    const find_organisme = await Organisme.findById(id)
    if(!find_organisme) res.send('This organisme is not found')
    // console.log(find_organisme)
    const second_organisme = await Organisme.findOne({phone:phone})
    if(second_organisme) throw Error(`This number ${phone} already exist`)
    console.log(second_organisme)
    res.json({second_organisme})
    const update_organisme = await Organisme.findByIdAndUpdate({_id: id}, {name: name, ville: ville, address, phone})
    res.json({update_organisme})
}




module.exports = {
    getOrganisme,
    addOrganisme,
    updateOrganism
}