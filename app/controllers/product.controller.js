/* Memanggil object db */
const db = require('../models')
/* membuat object product dan mengambil dari file model */
const Product = db.products

/* ini untuk menampilkan halaman seluruh product */
/* Membuat fungsi mencari data */
exports.findAll = (req, res) => {
  // Mencari semua data product di database
  Product.find()
  .then(result => {
      // Jika data ditemukan, maka kembalikan data ke client
      res.send(result)
    }).catch(err => {
      // Jika terjadi error, maka kembalikan error ke client
      res.status(409).send({
        message:
          err.message || 'Error retrieving products.'
      })
    })
}/* Lalu fungsi ini buatkan routes dan diregistrasikan */

/* Menampilkan halaman detail */
exports.findOne = (req, res) => {
  // Mencari semua data product di database sesuai id nya
  Product.findOne({
    code: req.params.id
  })
  .then(result => {
      // Jika data ditemukan, maka kembalikan data ke client
      res.send(result)
    }).catch(err => {
      // Jika terjadi error, maka kembalikan error ke client
      res.status(409).send({
        message:
          err.message || 'Error retrieving products.'
      })
    })
}/* Lalu fungsi ini buatkan routes dan diregistrasikan */