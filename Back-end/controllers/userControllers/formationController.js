const db = require('../../models')
const path = require('path')
const fs = require('fs')

const Formation = db.formation

const addFormation = async(req, res) => {
    const {name, date_debut, date_fin, description} = req.body
    let image = ''
    if(!name || !date_debut || !date_fin || !description || !req.file) res.json('fill all fields')
    else{
        if(req.file) image = req.file.filename
        const addDataFormation = {
            name: name,
            date_debut: date_debut,
            date_fin: date_fin,
            description: description,
            image: image
        }
        const add_formation = await Formation.create(addDataFormation)
        res.json({message: 'created'})
    }
}

const getformation = async (req, res) => {
    const allFormation = await Formation.find()
    res.json({allFormation})
}

const updateFormation = async (req, res) => {
    const {name, date_debut, date_fin, description} = req.body
    const { id } = req.params 
    if(!name || !date_debut || !date_fin || !description) res.send('Please Fill All The Fields')
    else{
        const updateFormation = {
            name: name,
            description: description,
            date_debut: date_debut,
            date_fin: date_fin,
        }
        if(updateFormation){
            await Formation.findByIdAndUpdate({_id: id}, updateFormation)
            .then(() => {
            res.send('Formation is Updated')
            })
            .catch(err => {
            throw Error(err)
            })
        }
    }
}

const deleteFormation = async(req, res) =>  {
    const id = req.params.id
    const find_formation = await Formation.findById(id)
    if(!find_formation) throw Error('Erroe, Formation not found')
    if(find_formation.status) await Formation.findByIdAndUpdate(id, { status: false})
    if(find_formation.status) res.json({message: 'delete successfully'})
    if(!find_formation.status) await Formation.findByIdAndUpdate(id, { status: true})
    if(!find_formation.status) res.json({message: 'reset successfully'})
}


module.exports = {
    addFormation,
    getformation,
    updateFormation,
    deleteFormation,
}