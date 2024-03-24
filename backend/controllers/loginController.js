const User = require('../models/userModel')
const mongoose = require('mongoose')

// const { OAuth2Client } = require('google-auth-library');
// const oauth2Client = new OAuth2Client()

// get all Users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})
  res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
}

const createUser = async (req, res) => {
    const {username, password} = req.body
  
    let emptyFields = []
  
    if (!username) {
      emptyFields.push('username')
    }
    if (!password) {
      emptyFields.push('password')
    }
    if (emptyFields.length > 0) {
      // console.log(emptyFields)
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  
    // add to the database
    try {
      const user = await User.create({ username, password })
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  

module.exports = {
    getUser,
    getUsers,
    createUser
}