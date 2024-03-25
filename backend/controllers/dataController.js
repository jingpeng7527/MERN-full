const Data = require('../models/dataModel')
const mongoose = require('mongoose')

// get all Datas
const getDatas = async (req, res) => {
  const user_id = req.user._id

  const data = await Data.find({user_id}).sort({createdAt: -1})

  res.status(200).json(data)
}

// get a single Data
const getData = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Data'})
  }

  const data = await Data.findById(id)

  if (!data) {
    return res.status(404).json({error: 'No such Data'})
  }
  
  res.status(200).json(data)
}


// create new Data
const createData = async (req, res) => {
  const {name, item, bill} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!item) {
    emptyFields.push('item')
  }
  if(!bill) {
    emptyFields.push('bill')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const data = await Data.create({name, item, bill, user_id})
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a Data
const deleteData = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Data'})
  }

  const data = await Data.findOneAndDelete({_id: id})

  if (!data) {
    return res.status(400).json({error: 'No such Data'})
  }

  res.status(200).json(data)
}

// update a Data
const updateData = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Data'})
  }

  const data = await Data.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!data) {
    return res.status(400).json({error: 'No such Data'})
  }

  res.status(200).json(data)
}


module.exports = {
  getDatas,
  getData,
  createData,
  deleteData,
  updateData
}