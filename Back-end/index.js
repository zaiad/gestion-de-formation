const express = require('express')
require('dotenv').config()
const authRoute = require('./Routers/authRoute')
const userRoute = require('./Routers/userRoutes/employeRoute')
const organismRoute = require('./Routers/userRoutes/organismeRoute')
const formationRoute = require('./Routers/userRoutes/formationRoute')

const { errorHandler } = require ('./middlewares/errorHandler')
const { formation } = require('./models')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

// connection db
require('./Config/dbConfig')

// Routers
app.use('/api/auth', authRoute)
app.use('/employe', userRoute)
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