const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model')

require('dotenv').config()
const app = express()
app.use(express.json())

const mongoURL = process.env.MONGOURL
mongoose.connect(mongoURL)
.then(() => {
    console.log('Database connected successfully!');
    app.listen(3001, () => {
        console.log('Server connected on port 3001');
    })
})
.catch(() => {
    console.log("Database failed to connect!");
})
app.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
})
app.get('/', (req, res) => {
    res.json('Hello world')
})