const express = require('express')
const {
    getDatas,
    getData,
    createData,
    deleteData,
    updateData
} = require('../controllers/dataController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all Data routes
router.use(requireAuth)

// GET all Datas
router.get('/', getDatas,)

//GET a single Data
router.get('/:id', getData)

// POST a new Data
router.post('/', createData)

// DELETE a Data
router.delete('/:id', deleteData)

// UPDATE a Data
router.patch('/:id', updateData)


module.exports = router