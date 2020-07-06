const conn = require('./connection.js')
const nanoid = require('nanoid')
// data usaha

var wilayah_function = {
  tambahDataWilayah : (obj, response) => {
    conn.query('INSERT INTO wilayah (id_wilayah, nama_wilayah, kepadatan_penduduk) VALUES (?, ?, ?)',
    [nanoid.nanoid(10), obj.nama_wilayah, obj.kepadatan_penduduk],
    (err, results) => {
      if(err) {
        console.log(err)
      } else {
        response(results)
      }
    }
  )},

  ambilSemuaDatawilayah : (response) => {
    conn.query('SELECT * FROM wilayah',(err, results) => {
      if(err) throw err
      response(results)
    })
  },

  hapusSatuDataWilayah: (id, response) => {
    conn.query(`DELETE FROM wilayah where id_wilayah = "${id}"`, (err, results) => {
      if(err) throw err
      response(results)
    })
  },

}

module.exports = wilayah_function