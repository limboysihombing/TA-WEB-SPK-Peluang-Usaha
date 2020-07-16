var express = require('express')
var router = express.Router()
var nanoid = require('nanoid')
const cors = require('cors')
const wilayahFunction = require('../../config/wilayah_function.js')


//get all
// router.get('/', (req, res) => {
//   console.log('sdfkj')
// })
// http://localhost:3000/api/usaha?modal=10000

router.get('/', (req, res) =>{
  wilayahFunction.ambilWilayahByKecamatan(req.query.kelurahan, (response) => {
    res.json({wilayah: response[0]})
  })
  
})

router.get('/ambilSatuWilayah', (req, res) =>{
  wilayahFunction.ambilWilayahByKecamatan(req.query.kelurahan, (response) => {
    res.status(200).json(response[0])
  })
})

router.get('/*', (req, res) => {
  res.json({msg: 'Halaman tidak ditemukan.'})
})

module.exports = router
