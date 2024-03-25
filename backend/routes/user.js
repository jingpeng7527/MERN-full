const express = require('express');
const {loginUsers, signupUsers} = require('../controllers/loginController')

const router = express.Router();

// router.get('/', getUsers)

// router.get('/:username/:password', getUser)

// router.post('/:username/:password', createUser)

router.post('/signup', signupUsers)

router.post('/login', loginUsers)

module.exports = router;