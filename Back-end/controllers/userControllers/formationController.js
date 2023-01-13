const db = require('../../models')
const path = require('path')
const fs = require('fs')

const Formation = db.formation

const addFormation = async(req, res) => {
    const {name, date_debut, date_fin, description} = req.body
    if(!name || !date_debut || !date_fin || !description) res.send('fill all fields')
    const addDataFormation = {
        name: name,
        date_debut: date_debut,
        date_fin: date_fin,
        description: description,
        image: req.file.filename
    }
    await Formation.create(addDataFormation)
    try {
        res.send('created')
    } catch (error) {
        throw Error ({message: 'error'})
    }
}

const getformation = async (req, res) => {
    const allFormation = await Formation.find()
    res.json({allFormation})
}

const updateFormation = async (req, res) => {
    const {name, date_debut, date_fin, description} = req.body
    const {body} = req
    // console.log(req.body)
    const { id } = req.params 
    if(!name || !date_debut || !date_fin || !description) res.send('Please Fill All The Fields')
    else{
        const updateFormation = {
            name: name,
            description: description,
            date_debut: date_debut,
            date_fin: date_fin,
            images: req.file.filename
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


module.exports = {
    addFormation,
    getformation,
    updateFormation,
}