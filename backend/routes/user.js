const express = require('express');
const {getUser, getUsers, createUser} = require('../controllers/loginController')

const router = express.Router();

router.get('/', getUsers)

router.get('/:username/:password', getUser)

router.post('/:username/:password', createUser)

// router.delete('/:id', deleteWorkout)

// router.patch('/:id', updateWorkout)

module.exports = router;