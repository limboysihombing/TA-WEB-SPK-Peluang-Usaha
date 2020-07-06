const express = require('express')
const router = express.Router()
const usahaFunction = require('../config/usaha_function.js')
const wilayahFunction = require('../config/wilayah_function.js')
const userFunction = require('../config/user_function')
const querystring = require('querystring');   
const jwt = require('jsonwebtoken') 

router.get('/', (req, res) => {
  res.redirect('/admin/daftar_usaha')
})
router.get('/*', verifyToken)

// Ambil semua daftar usaha 
router.get('/daftar_usaha', (req, res) => {
  usahaFunction.ambilSemuaDataUsaha(results => {  
    if(results.length > 0){
      res.render('admin-view/admin', {layout: 'admin', title: 'Daftar Usaha - Admin', daftarUsaha: results, msg: req.query.message, akun: req.akun})
    }
    else {
      res.render('admin-view/admin', {layout: 'admin', title: 'Daftar Usaha - Admin', msg : "Data usaha tidak tersedia."})
    }
  })
})

// Ambil Semua Daftar Pengguna
router.get('/daftar_pengguna', (req, res) => {
  userFunction.ambilSemuaDataPengguna(results => {
    res.render('admin-view/daftar-pengguna', {layout: 'admin', title: 'Data Pengguna', daftarPengguna: results, akun: req.akun})
  })
})
// Render form tambah usaha
router.get('/form_tambah_usaha', (req, res) => {
  res.render('admin-view/tambah-data-usaha', {layout: 'admin', title: 'Tambah Data Usaha', akun: req.akun})
})

// Insert usaha
router.post('/form_tambah_usaha', (req, res) => {

    usahaFunction.tambahDataUsaha(req.body, results => {
      res.redirect('/admin/daftar_usaha')
    })
  
})

// Ambil 1 usaha berdasarkan id
router.get('/detail_usaha/:id', (req, res) => {
  usahaFunction.ambilSatuDataUsaha(req.params.id, result => {
    res.render('admin-view/detail-usaha', {layout:'admin',  title: result[0].nama_usaha, usaha: result[0]})
  })
}),

// hapus usaha berdasarkan id
router.get('/hapus_usaha/:id', (req, res) => {

  const hapusSatuDataUsaha = (resolve, reject) => {
    usahaFunction.hapusSatuDataUsaha(req.params.id, result => {
      if(result.affectedRows > 0) {
        resolve("Data berhasil dihapus.")
      } else {
        rejected('Data gagal dihapus.')
      }
    })
  }
  
  const hapusData = new Promise(hapusSatuDataUsaha);
  hapusData.then(resolvedValue => {
    const query = querystring.stringify({
      "message":resolvedValue,
    });
    res.redirect('/admin/daftar_usaha/?' + query);
  })

})

//  --------- Wilayah -------------

// Render form tambah wilayah
router.get('/form_tambah_wilayah', (req, res) => {
  res.render('admin-view/tambah-data-wilayah.hbs', {layout: 'admin', title: 'Tambah Wilayah', akun: req.akun})
})

// Insert wilayah
router.post('/form_tambah_wilayah', (req, res) => {
  wilayahFunction.tambahDataWilayah(req.body, response => {
    if(response.affectedRows > 0) {
      res.redirect('/admin/daftar_wilayah')
    }
  })
})

// Ambil semua daftar wilayah
router.get('/daftar_wilayah', (req, res) => {
  wilayahFunction.ambilSemuaDatawilayah(response => {
    res.render('admin-view/daftar-wilayah', {title: 'Daftar Wilayah', layout: 'admin', daftarWilayah: response, akun: req.akun})
  })
})

// Hapus Wilayah by ID
router.get('/hapus_wilayah/:id', (req, res) => {
  
  wilayahFunction.hapusSatuDataWilayah(req.params.id, response => {
    if(response.affectedRows > 0) {
      res.redirect('/admin/daftar_wilayah')
    }
  })
})

// Logout
router.get('/logout', (req, res) => {
  res.cookie('token_admin', undefined)
  res.render('admin-view/login', {layout: 'admin'})
})

// Ferifikasi token untuk semua route
function verifyToken(req, res, next) {

  if(req.cookies && req.cookies.token_admin && req.cookies.token_admin != 'undefined'){
    req.akun = jwt.verify(req.cookies.token_admin, 'shhhhh')    
    next()
  } else {
    res.render('admin-view/login', {layout: 'admin', msg: "Silahkan login terlebih dahulu."})
  }
}

module.exports = router
