const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../../middlewares/mailer')
const storage = require('local-storage')

const Role = db.role;
const User = db.user;


    const login = async(req, res) => {
        const {email, password} = req.body
        if(!email || !password) throw Error ('Please fill all fields')
        const login_user = await User.findOne({email})
        if(!login_user || !(await bcrypt.compare(password, login_user.password))) throw Error ('Your email or password is incorrect')
        const role = await Role.findById({_id: login_user.roles})
        const token = await jwt.sign({_id: login_user._id}, process.env.TOKEN_KEY)
        storage ('token', token)
        res.json({message: 'Login success', email: login_user.email, token: storage('token'), role: role.name})
    }

    const logout = async (req, res) => {
        storage.clear();
        res.send(true);
    };



module.exports = {
    login,
    logout
}