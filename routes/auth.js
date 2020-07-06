const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const daftar_user = require('../config/user_function')

router.get('/', (req, res) => {
  res.render('login', {layout: 'blank', title: 'Masukkan Akun'})
})

router.post('/admin_login', (req, res) => {
  let user
  daftar_user.ambilSatuAdmin(req.body.user_email, (hasil)=>{
    if(hasil.length < 1){
      res.status(404)
      res.render('admin-view/login', {layout: 'admin', msg : 'email yang anda masukkan tidak terdaftar'})
    }
    else{
      let index = hasil.findIndex((u)=>{
        return u.password == req.body.user_password
      })
      if(index > -1){
        user = hasil[index]
        let token = jwt.sign({id_admin : user.id_admin, email : user.email, nama_pengguna : user.nama_admin}, 'shhhhh')
        res.status(200)
        res.cookie('token_admin', token)
        
        res.redirect('/admin')
      }else{
        res.status(404)
        res.render('admin-view/login', {layout: 'admin', msg : 'Password yang anda masukkan salah.'})
      }
    }
  })
  
})

router.post('/pengguna_login', (req, res) => {
  let user
  daftar_user.ambilSatuPengguna(req.body.user_email, (hasil) => {
    if(hasil.length < 1) {
      res.status(404)
      res.render('login', {layout: 'blank', title: 'Masuk', msg: 'email yang anda masukkan tidak terdaftar.'})
    } else {
      let index = hasil.findIndex(u => {
        return u.password === req.body.user_password
      })
      
      if(index > -1) {
        user= hasil[index]
        let token = jwt.sign({id_pengguna : user.id_pengguna, email : user.email, nama_pengguna : user.nama_pengguna}, 'shhhhh')
        res.status(200)
        res.cookie('token', token)
        res.redirect('/')
      } else {
        res.status(404)
        res.render('login', {layout: 'blank', title: 'Masuk', msg : 'Password yang anda masukkan salah.'})
      }
    }
  })
})


module.exports = router