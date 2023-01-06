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






module.exports = {
    addFormation,
}