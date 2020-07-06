var express = require('express')
var router = express.Router()
var nanoid = require('nanoid')
const cors = require('cors')
const usahaFunction = require('../../config/usaha_function.js')

// router.use(cors)
//get all
router.get('/', (req, res) =>{
  usahaFunction.ambilSemuaDataUsaha(result => {
    res.json({usaha: result})
  })
})
module.exports = router
