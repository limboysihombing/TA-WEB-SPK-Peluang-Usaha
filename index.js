const express = require("express")
const exphbs = require('express-handlebars')
const usahaFunction = require('./config/usaha_function.js')
const userFunction = require('./config/user_function.js')
const usahaTersimpanFunction = require('./config/usaha_tersimpan_function.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const nanoid = require('nanoid')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Middleware hbs
app.engine('.hbs', exphbs());
app.set('view engine', '.hbs');

app.use(express.static('./public'))
app.use(cookieParser())

app.use('/auth', require('./routes/auth'))
app.use('/admin', require('./routes/admin'))

// Home
app.get("/", function(req, res) {
  if (req.cookies && req.cookies.token && req.cookies.token !== 'undefined') { 
		const user = jwt.verify(req.cookies.token, 'shhhhh')

    usahaFunction.ambilSemuaDataUsaha(result => {
      
      res.render('home', {layout: 'home', title: "SPK Peluang Usaha", daftarUsaha: result, akun: user})
    })

	} else {
		// cookie tidak tersedia
		res.render('login', {layout: 'blank', title: 'Masuk', msg: 'Maaf, anda harus masuk terlebih dahulu untuk melanjutkan.'})
  }
})

// Ambil detail usaha berdasarkan id
app.get('/detail_usaha/:id_usaha', (req,res) => {
  if (req.cookies && req.cookies.token && req.cookies.token !== 'undefined') { 
    const user = jwt.verify(req.cookies.token, 'shhhhh')
    let message
    if(req.query.saved_status && req.query.saved_status === 'success') {
      message = "Berhasil menyimpan"
    } else if(req.query.saved_status && req.query.saved_status === 'failed') {
      message = "Gagal menyimpan data usaha."
    }
    usahaFunction.ambilSatuDataUsaha(req.params.id_usaha, result=> {
      res.render('detail-usaha', {title: result[0].nama_usaha, usaha: result[0], akun: user, message})
    })

	} else {
		// cookie tidak tersedia
		res.render('login', {msg: 'Maaf Anda belum masuk. Silahkan masuk terlebih dahulu'})
  }
})

// Simpan usaha
app.get('/simpan_usaha', (req, res) => {

  if (req.cookies && req.cookies.token && req.cookies.token !== 'undefined') { 
    const user = jwt.verify(req.cookies.token, 'shhhhh')
    const id_usaha = req.query.idu
    const id_wilayah = req.query.idw
    const id_usaha_tersimpan = nanoid.nanoid(10)
    let usaha = {
      id_usaha_tersimpan,
      id_usaha,
      id_wilayah,
      id_pengguna: user.id_pengguna,
      latitude: '1,9012389',
      longitude: '1,9012312989',
    }
    usahaTersimpanFunction.simpanUsaha(usaha, (results, fields) => {
      if(results.affectedRows > 0) {
        res.redirect(`/detail_usaha_tersimpan/${usaha.id_usaha_tersimpan}?saved_status=success`)
      } else {
        res.redirect(`/detail_usaha/${usaha.id_usaha_tersimpan}?saved_status=failed`)
      }
    })

  } else {
    // cookie tidak tersedia
    res.render('login', {msg: 'Maaf Anda belum masuk. Silahkan login terlebih dahulu'})
  }
})

// Hapus usaha tersimpan by id
app.get('/hapus_usaha_tersimpan/:id_usaha_tersimpan', (req, res) => {
  
  usahaTersimpanFunction.hapusUsahaTersimpan(req.params.id_usaha_tersimpan, response => {
    if(response.affectedRows > 0) {
      res.redirect(`/usaha_tersimpan?act=deleted`)
    }
  })
})

// Ambil semua usaha tersimpan
app.get('/usaha_tersimpan', (req, res) => {
  if (req.cookies && req.cookies.token && req.cookies.token !== 'undefined') {
    const user = jwt.verify(req.cookies.token, 'shhhhh')
    let message = ''
    if(req.query.act) {
      message = 'Berhasil menghapus usaha.'
    }
    
    usahaTersimpanFunction.ambilUsahaTersimpan(user.id_pengguna, result => {
      res.render('usaha-tersimpan', {title: 'Usaha Tersimpan', daftarUsaha: result, msg: message, akun: user})
    })

	} else {
		// cookie tidak tersedia
		res.render('login', {layout: 'blank', title: 'Masuk', msg: 'Maaf, anda harus masuk terlebih dahulu untuk melanjutkan.'})
  }
})

// Ambil satu data usaha tersimpan berdasarkan id
app.get('/detail_usaha_tersimpan/:id_usaha_tersimpan', (req,res) => {
  if (req.cookies && req.cookies.token && req.cookies.token !== 'undefined') { 
    const user = jwt.verify(req.cookies.token, 'shhhhh')
    let message
    if(req.query.saved_status && req.query.saved_status === 'success') {
      message = "Berhasil disimpan."
    } else if(req.query.saved_status && req.query.saved_status === 'failed') {
      message = "Gagal menyimpan usaha."
    }
    usahaTersimpanFunction.ambilSatuUsahaTersimpan(req.params.id_usaha_tersimpan, result=> {
      // res.render('detail-usaha', {title: result[0].nama_usaha, usaha: result[0], akun: user, message})
      res.render('detail-usaha', {layout: "home", title: 'Detail Usaha', usaha: result[0], akun: user, message})
    })

	} else {
		// cookie tidak tersedia
		res.render('login', {msg: 'Maaf Anda belum masuk. Silahkan masuk terlebih dahulu'})
  }
})

// halaman register
app.get('/mendaftar', (req, res) => {
  res.render('mendaftar', {title: 'Mendaftar Akun Baru', layout: 'blank'})
})
// Register
app.post('/mendaftar', (req, res) => {
  
  if(req.body.password === req.body.password2) {
    userFunction.tambahPengguna(req.body, response => {
      if(response.affectedRows >= 1) {
        res.redirect('/')
      }
    })
  } else {
    res.render('mendaftar', {title: 'Mendaftar Akun Baru', layout: 'blank', msg: 'Validasi tidak sama dengan kata sandi'})
  }
})

// Login
app.get('/masuk', (req, res) => {
  res.render('login', {layout: 'blank', title: "Masuk"})
})

// Keluar akun dan hapus cookid
app.get('/logout', (req, res) => {
  res.cookie('token', undefined)
  res.redirect('/masuk')
})

// api to mobile 
app.use('/api/usaha', require('./routes/api/usaha'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/wilayah', require('./routes/api/wilayah'))
app.use('/api', require('./routes/api/api'))

var PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
  console.log(`Server berjalan pada port ${PORT}`)
})
