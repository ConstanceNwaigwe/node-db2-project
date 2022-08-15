const express = require("express")

const server = express()
const carRouter = require('./cars/cars-router')

// DO YOUR MAGIC
server.use(express.json())

server.use('/api/cars', carRouter);

server.use('*', (req,res) => {
    res.status(404).json({message: 'not found'});
})

module.exports = server
