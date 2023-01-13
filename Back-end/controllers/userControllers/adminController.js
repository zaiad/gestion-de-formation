const db = require('../../models')
const Storage = require('local-storage')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const Historique = db.historique
const User = db.user
const Role = db.role
const Formation = db.formation
const Organisme = db.organisme

const addEmploye = async(req, res) => {
    const {username, email, password, organisme} = req.body
    if(!username || !email || !password || !organisme) throw Error('Please Fill All The Fields')
    const organismes = await Organisme.findOne({name: organisme})
    if(organismes){
        // const organisme_id= organismes.id.toString()
        const emailExist = await User.findOne({email})
        if (emailExist) throw Error(`${email} already Exists`)
        const hash_password = await bcrypt.hash(password, 10)
        const employeRole = await Role.findOne({name: "employe"})
        const addDataEmploye = {
            username: username,
            email: email,
            password: hash_password,
            roles: employeRole._id,
            organisme_id: organismes._id
        }
        const addEmploye = await User.create(addDataEmploye)
        if(addEmploye) res.send('Employe is Created')
        else throw Error('Employe not created')
    }else{
        throw Error('aucune organisation avec ce nom')
    }
}

const getDataUser = async(req, res) => {
    const employeRole = await Role.findOne({name: "employe"})
    const employe = await User.find({roles: employeRole})
    .populate('organisme_id')
    res.json({employe})
}

const deleteEmploye = async(req, res) => {
    const id = req.params.id
    const findEmploye = await User.findById(id)
    if(!findEmploye) {
        res.send('not found the employe')
    }
        await User.findByIdAndDelete({_id: id})
        res.send('deleted successfully')
}


module.exports = {
    addEmploye,
    getDataUser,
    deleteEmploye
}