const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/users')
const productRoute = require('./routes/products')
const asyncHandler = require('express-async-handler')

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)

app.options('*', cors)

const port = process.env.PORT
const db = process.env.DB_CONNECT

// custom error handler
app.use((err, req, res, next) => {
    const error = res.statusCode === 200 ? 500 : res.statusCode

    res.status(error)
    res.json({
        message: err.message,
        status: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
})


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'bidhunter_data'
}).then(() => {
    console.log('connection to db successful')
}).catch(err => {
    console.log(err)
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})