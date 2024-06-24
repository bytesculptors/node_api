const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model')

require('dotenv').config()
const app = express()
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

app.put('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({message: 'Product not found'})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/', (req, res) => {
    res.json('Hello world')
})