const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/product.route')

require('dotenv').config()
app.use(express.json())

const mongoURL = process.env.MONGOURL
const port = process.env.PORT

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(port, () => {
            console.log(`Server connected on port ${port}`);
        })
    })
    .catch(() => {
        console.log("Database failed to connect!");
    })

app.use('/api/product', productRoute)

