const express = require('express')
require('dotenv').config()
const cors = require("cors");
const authRoute = require('./Routers/authRoute')
const organismRoute = require('./Routers/userRoutes/organismeRoute')
const formationRoute = require('./Routers/userRoutes/formationRoute')
const adminRoute = require('./Routers/userRoutes/adminRoute')

const { errorHandler } = require ('./middlewares/errorHandler')
const { formation } = require('./models')

const app = express()
app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

// connection db
require('./Config/dbConfig')

// Routers
app.use('/api/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/organisme', organismRoute)
app.use('/formation', formationRoute)

app.use(errorHandler)


app.all('*', (req, res) => {
    res.send('page not found')
})


// port
app.listen(process.env.PORT || 4001, () => {
    console.log(`server is running on ${process.env.PORT}`)
})