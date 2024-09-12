const dbConfig = require('../../config/db.config')

const mongoose = require('mongoose')

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