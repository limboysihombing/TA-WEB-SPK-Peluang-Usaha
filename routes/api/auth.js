var express = require('express')
var router = express.Router()
var nanoid = require('nanoid')
const cors = require('cors')
const userFunction = require('../../config/user_function.js')
const usahaTersimpanFunction = require('../../config/usaha_tersimpan_function.js')
const jwt = require('jsonwebtoken') 


router.use(cors())

// Client Login
router.post('/login', (req, res) =>{
  let user
  userFunction.ambilSatuPengguna(req.body.email, (hasil) => {
    if(hasil.length < 1) {
      res.status(404).json({msg: 'Email yang anda masukkan tidak terdaftar.'})
    } else {
      let index = hasil.findIndex(u => {
        return u.password === req.body.password
      })
      
      if(index > -1) {
        user= hasil[index]
        let token = jwt.sign({id_pengguna : user.id_pengguna, email : user.email, nama_pengguna : user.nama_pengguna}, 'shhhhh')
        res.status(200).json({nama_pengguna : user.nama_pengguna, email: user.email, token})
      } else {
        res.status(404).json({msg: 'Password yang anda masukkan salah.'})
      }
    }
  })
})

// Client Mendaftar
router.post('/mendaftar', (req,res) => {
  userFunction.tambahPengguna(req.body, response => {
    if(response.affectedRows >= 1) {
      ambilSatuPengguna(req.body.email).then(data => {
        let user = data[0]
        let token = jwt.sign({id_pengguna: user.id_pengguna, email: user.email, nama_pengguna : user.nama_pengguna}, 'shhhhh')
        res.status(200).json({id_pengguna: user.id_pengguna, email: user.email, nama_pengguna : user.nama_pengguna, token})
      }) 
    } else {
      res.status(500).json({msg: 'Server mengalami masalah'})
    }
  })
})

ambilSatuPengguna = (email) => {
  return new Promise((resolve, reject) => {
    userFunction.ambilSatuPengguna(email, (hasil) => {
      resolve(hasil)
    })
  })

}

module.exports = router