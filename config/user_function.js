const conn = require('./connection.js')
const nanoid = require('nanoid')


const user_function = {
  ambilSatuAdmin : (email, hasil, msg)=>{
    conn.query(`SELECT * FROM admin WHERE email='${email}'`, (err, result)=>{
      if(err) throw err;
      else{
          hasil(result) 
      }
    }) 
  },
  ambilSatuPengguna: (email, hasil) => {
    conn.query(`SELECT * FROM pengguna WHERE email='${email}'`, (err, result) => {
      if(err) throw err;
      else {
        hasil(result)
      }
    })
  },
  // Data Pengguna
  
  ambilSemuaDataPengguna: (results) => {
    conn.query("SELECT * FROM pengguna", (err, res) => {
      if(err) throw err
      results(res)
    })
  },
  
  tambahPengguna: (user, response) => {
    
    conn.query(`INSERT INTO pengguna (id_pengguna, nama_pengguna, email, password, gambar) values (?, ?, ?, ?, ?)`, 
    [nanoid.nanoid(10), user.nama_pengguna, user.email, user.password, ""], (err, rows) => {
      if(err) throw err
      response(rows)
    })
  }

}

module.exports = user_function