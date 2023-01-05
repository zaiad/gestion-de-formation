const db = require('../../models')

const Employe = db.user
const Role = db.role


const getEmploye = async(req, res) => {
    const employe = await Employe.find()
    res.json({employe})

}

const addEmploye = async(req, res) => {
    const {username, email} = req.body
    if(!username || !email) throw Error('Fill the all fields to add employe')
    const employe = await Employe.findOne({email})
    const role = "63b4284e2052399cf5bdb41e"
    if(employe) {
        throw Error(`you can't add this ${email}` )
    } else {
        const addEmploye = await Employe.create({
            username,
            email,
            role: role
        })
        res.json(addEmploye)
    }

}

const updateEmploye = async(req, res) => {
    const  id = req.params.id
    const {username, email} = req.body
    const findEmploye = await Employe.findById(id)
    // console.log(findEmploye)
    if(!findEmploye) res.send('This employe was not found')
    const secondEmploye = await Employe.findOne({username, email})
    if(secondEmploye) res.send(`this ${email} already exist`)
    const updateEmploye = await Employe.findByIdAndUpdate({_id: id}, {username: username, email: email})
    console.log(updateEmploye)
    res.json({message: 'is updated on your compte'})
}

const deleteEmploye = async(req, res) => {
    const id = req.params.id
    const findEmploye = await Employe.findById(id)
    if(!findEmploye) {
        res.send('not found the employe')
    }
        await Employe.findByIdAndDelete({_id: id})
        res.send('deleted successfully')
}




module.exports = {
    getEmploye,
    addEmploye,
    updateEmploye,
    deleteEmploye
}