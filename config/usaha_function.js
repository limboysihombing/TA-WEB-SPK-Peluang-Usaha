const conn = require('./connection.js')
const nanoid = require('nanoid')

// data usaha

var usaha_function = {
  tambahDataUsaha : (obj, result) => {
    conn.query('INSERT INTO usaha (id_usaha, nama_usaha, jenis_usaha, gambar,  modal, deskripsi_usaha, bahan_baku, target_pasar, kepadatan_penduduk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nanoid.nanoid(10), obj.nama_usaha, obj.jenis_usaha, "gambarBiasar", obj.modal_usaha, obj.deskripsi_usaha, obj.bahan_baku, obj.target_pasar, obj.kepadatan_penduduk],
    (err, rows, fields) => {
      if(err) {
        console.log(err)
      } else {
        result(rows, fields)
      }
    }
  )},
  ambilSemuaDataUsaha : (result) => {
    conn.query('SELECT * FROM usaha',(err, results) => {
      if(err) throw err
      result(results)
    })
  },
  ambilSatuDataUsaha: (id, result) => {
    conn.query(`SELECT * FROM usaha where id_usaha = "${id}"`, (err, data) => {
      if(err) throw err
      result(data)
    })
  },

  hapusSatuDataUsaha: (id, result) => {
    conn.query(`DELETE FROM usaha where id_usaha = "${id}"`, (err, res) => {
      if(err) throw err
        
      result(res)
    })
  },

}



module.exports = usaha_function