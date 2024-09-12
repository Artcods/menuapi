/* Routes untuk me-registrasikan function dan API (get, post, delete) */
/* Jika memanipulasi data di controllers wajib me-registrasikan supaya dapat digunakan */

module.exports = (app) => {
    /* untuk memanggil controllers yang sudah dibuat */
    const orders = require('../controllers/order.controller')

    /* membuat router dari express (khusushon) */
    const router = require('express').Router()

    /* mengarahkan object product dari controllers lalu panggil app.js*/
    router.get('/user/:id', orders.findOrder) // harus diuji postman

    /* Membuat post untuk menambahkan items */
    router.post('/user/:id/add', orders.addToCart)
    
    
    router.delete('/user/:id/product/:product', orders.removeFromCart)

    /* registrasikan router */
    app.use('/api/order', router)
}

/* registrasikan kedalam entry point */