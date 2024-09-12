const express = require('express')
const app = express()

// Definisikan Port
const PORT = process.env.PORT || 8000


// Middleware to parse JSON request bodies
app.use(express.json()) // setiap ada req dari client akan diubah menjadi json
app.use(express.urlencoded( { extended: true } )) // menerima data dari inputan form

/* memanggil model dari index.js */
const db = require('./app/models')

db.mongoose.connect(db.url, {

    // Opsi lain bisa ditambahkan di sini
}).then((result) => {
    console.log('Connected to the database!')
}).catch((error) => {
    console.error('Could not connect to the database!', error)
    process.exit()
})



// Route untuk mengembalikan data

app.get('/', (req, res) => {
    // Respon dengan JSON data
    res.json({
        message: 'Hello, World!',
        timestamp: new Date()
    })
})

/* dari routes folder panggil kesini */
require('./app/routes/product.route')(app)
require('./app/routes/order.route')(app)

app.listen(PORT, () => {
    console.log(`Are you sure you want to listen http://localhost:${PORT}`)
})

/* 1. Membuat folder config untuk menyimpan configurasi untuk dapat terhubung ke monggodb */