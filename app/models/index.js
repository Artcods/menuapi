/* Hal yang wajib dilakukan yaitu membuat object terlebih dahulu sebelum membuat function di controllers */
/* 1. Config DB */
/* 2. Buat Object yaitu (db) => untuk memanggil seluruh file models kemudian di exports untuk bisa digunakan oleh controllers */


const dbConfig = require('../../config/db.config')

const mongoose = require('mongoose')

/* mongoose dan menetapkan standar ES6 */
mongoose.Promise = global.Promise

/* object db untuk memanggil seluruh file */
const db = {}
/* menyimpan promise dari mongoose */
db.mongoose = mongoose
/* Agar bisa terhubung ke monggodb dari url di config */
db.url = dbConfig.url
/* Meregistrasikan model kedalam index.js lalu panggil kedalam app.js*/
db.products = require('./product.model')(mongoose)
/* registrasikan orders */
db.orders = require('./order.model')(mongoose) // parameter mongoose

/* export object db */
module.exports = db