const express = require('express')
const app = express()

// Definisikan Port
const PORT = process.env.PORT || 8000


// Middleware to parse JSON request bodies
app.use(express.json()) // setiap ada req dari client akan diubah menjadi json
app.use(express.urlencoded( { extended: true } )) // menerima data dari inputan form


// Route untuk mengembalikan data

app.get('/', (req, res) => {
    // Respon dengan JSON data
    res.json({
        message: 'Hello, World!',
        timestamp: new Date()
    })
})

app.listen(PORT, () => {
    console.log(`Are you sure you want to listen http://localhost:${PORT}`)
})