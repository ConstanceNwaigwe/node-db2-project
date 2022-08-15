// DO YOUR MAGIC
const router = require('express').Router();
const mdw = require('./cars-middleware')
const Cars = require('./cars-model')

router.get('/api/car', async (req,res, next)=> {
    try{
        const cars = await Cars.getAll()
        res.json(cars)
    }
    catch (err){
        next()
    }
})
router.get('/api/car/:id', mdw.checkCarId, (req,res, next)=> {
    res.json(req.car)
})
router.post('/api/car', mdw.checkCarPayload, mdw.checkVinNumberUnique, mdw.checkVinNumberValid, async (req,res, next)=> {
    try{
        const newcar = await Cars.create(req.body)
        res.status(201).json(newcar)
    }
    catch (err){
        next()
    }
})

module.exports = router;