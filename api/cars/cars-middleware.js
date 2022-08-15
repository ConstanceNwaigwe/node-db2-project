//const express = require('express');
const Cars = require('./cars-model');
const db = require('../../data/db-config')
const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const car = await Cars.getById(req.params.id)
    if(!car){
      next({status: 404, message: `car with id ${req.params.id} is not found`})
    } else{
      req.car = car;
    }
  }
  catch (err) {
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const error = {status: 400};
  const { vin, make, model, mileage } = req.body;
  if(vin == undefined){
    error.message = `${vin} is missing`
  }
  else if(make == undefined){
    error.message = `${make} is missing`
  }
  else if(model == undefined){
    error.message = `${model} is missing`
  }
  else if(mileage == undefined){
    error.message = `${mileage} is missing`
  }

  if(error.message){
    next(error)
  } else{
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  var vinValidator = require('vin-validator');
  var isValidVin = vinValidator.validate(vin);
  if(!isValidVin){
    next({status: 400, message: `vin ${vin} is invalid`})
  }else{
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const isReal = await db('cars').where('vin', req.body.vin.trim()).first()
    if(isReal){
      next({status: 400, message: `vin ${vin} already exists`})
    } else{
      next()
    }
  }
  catch (err) {
    next()
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
