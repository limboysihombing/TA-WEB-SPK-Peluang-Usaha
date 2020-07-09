var express = require('express')
var router = express.Router()
var nanoid = require('nanoid')
const cors = require('cors')
const usahaFunction = require('../../config/usaha_function.js')

// router.use(cors)
//get all
// router.get('/', (req, res) => {
//   console.log('sdfkj')
// })
// http://localhost:3000/api/usaha?modal=10000

router.get('/', (req, res) =>{
  usahaFunction.ambilSemuaDataUsaha(result => {
    res.json({usaha: result})
  })
})

router.get('/*', (req, res) => {
  res.json({msg: 'Halaman tidak ditemukan.'})
})

module.exports = router
