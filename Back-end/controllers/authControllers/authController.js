const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../../middlewares/mailer')
const storage = require('local-storage')

const Role = db.role;
const User = db.user;

const register = async(req, res) => {
    const {username, email, password, confirm_password} = req.body
        if (!username || !email || !password) throw Error ('Please fill all fields')
        if (password != confirm_password) throw Error ('you have to be the password and confirm password the same thing')
        const emailExist = await User.findOne({email: email})
        if(emailExist) throw Error ('Email already exist')
        const hashPassword = await bcrypt.hash(password, 10)
        const managerRole = await Role.findOne({name: "admin"})
            const user = await User.create({
                username,
                email,
                password: hashPassword,
                roles: managerRole._id,
            })
            if(user){
                mailer.main('register', user)
                res.json({message: 'Successfully, Check your email to active your account', email, password:hashPassword})
            }
            if(!user) throw Error('User not created try again')
        }


    const login = async(req, res) => {
        const {email, password} = req.body
        if(!email || !password) throw Error ('Please fill all fields')
        const login_user = await User.findOne({email})
        if(!login_user || !(await bcrypt.compare(password, login_user.password))) throw Error ('Your email or password is incorrect')
        const role = await Role.findById({_id: login_user.roles})
        const token = await jwt.sign({_id: login_user.id}, process.env.TOKEN_KEY)
        storage ('token', token)
        res.json({message: 'Login success', email: login_user.email, token: storage('token')})
    }


    const verfyEmail = async (req, res) =>{
        const verify_email = await jwt.verify(req.params.token, process.env.TOKEN_KEY)
        const verify_user = await User.findOne({email: verify_email.email}) 
        if(verify_user.verification == true) res.redirect('http://localhost:4000/login')
        const verification_email = await User.updateOne({email: verify_email.email}, {$set: {verification: true}})
        if(!verification_email) res.redirect('http://localhost:4000/login')
        res.redirect('http://localhost:4000/login')
    }

    const logout = async (req, res) => {
        storage.clear();
        res.send(true);
    };



module.exports = {
    register,
    login,
    verfyEmail,
    logout
}