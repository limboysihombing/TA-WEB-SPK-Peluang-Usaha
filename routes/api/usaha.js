var express = require('express')
var router = express.Router()
var nanoid = require('nanoid')
const cors = require('cors')
const usahaFunction = require('../../config/usaha_function.js')
const usahaTersimpanFunction = require('../../config/usaha_tersimpan_function.js')
const jwt = require('jsonwebtoken') 

router.use(cors())
router.all('/*', verifyToken)

router.get('/ambilSemuaUsaha', (req, res) =>{
  usahaFunction.ambilSemuaDataUsaha(result => {
    res.json({usaha: result})
  })
})

router.get('/ambilUsaha', (req, res) =>{
  usahaFunction.ambilSemuaDataUsaha(result => {
    res.status(200).json(result)
  })
})
router.get('/ambilUsahaTersimpan', (req, res) =>{
  usahaTersimpanFunction.ambilUsahaTersimpan(req.token.id_pengguna, response => {
    console.log(response)
    res.status(200).json(response)
  })
})


router.post('/simpanUsaha', (req, res) => {
  req.body.id_pengguna = req.token.id_pengguna
  usahaTersimpanFunction.simpanUsaha(req.body, response => {
    if(response.affectedRows > 0) {
      res.status(200).json({status: 200, message: "success"})
    } else {
      res.status(500).json({message: 'failed'})
    }
  })
})

router.post('/hapusUsahaTersimpan', (req, res) => {
  req.body.id_pengguna = req.token.id_pengguna
  usahaTersimpanFunction.hapusUsahaTersimpanByUser(req.body, response => {
    if(response.affectedRows > 0) {
      console.log(response)
      res.status(200).json({status: 200, message: "success"})
    } else {
      res.json({message: 'failed'})
    }
  })
})

router.delete('/hapusUsahaTersimpanById/:id_usaha', (req, res) => {
  req.body.id_pengguna = req.token.id_pengguna
  usahaTersimpanFunction.hapusUsahaTersimpan(req.params.id_usaha, response => {
    if(response.affectedRows > 0) {
      res.status(200).end()
    } else {
      res.status(500).json({message: 'failed'})
    }
  })
})

//Cek usaha apakah sudah ada di db tabel usaha_tersimpan
router.post('/cekUsahaTersimpan', (req, res) =>{
  req.body.id_pengguna = req.token.id_pengguna
  usahaTersimpanFunction.cekUsahaTersimpan(req.body, result => {
    res.json({usaha :result})
  }) 
})



function verifyToken(req, res, next) {
  
  if(req.headers.token){
    let token = jwt.verify(req.headers.token, 'shhhhh')    
    req.token = token
    next()
  } else {
    res.status(403)
    res.json({status: 403, msg: 'Request denied!'})
  }
  
}
module.exports = router
