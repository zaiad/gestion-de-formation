const express = require('express')
require('dotenv').config()
const authRoute = require('./Routers/authRoute')

const { errorHandler } = require ('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

// connection db
require('./Config/dbConfig')

// Routers
app.use('/api/auth', authRoute)
app.use(errorHandler)


app.all('*', (req, res) => {
    res.send('page not found')
})


// port
app.listen(process.env.PORT || 4001, () => {
    console.log(`server is running on ${process.env.PORT}`)
})