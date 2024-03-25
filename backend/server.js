require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const dataRoutes = require('./routes/data')
const userRoutes = require('./routes/user')


// Create express app
const app = express()

// Middleware
app.use(express.json())

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user', userRoutes)
app.use('/api/data', dataRoutes)

//connect to mongodb
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        
        app.listen(process.env.PORT, () => {
            console.log('connect to db && listening on port', process.env.PORT)
        })

    })
    .catch(err => {
        console.log(err)
    })

// process.env