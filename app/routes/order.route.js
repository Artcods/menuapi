
module.exports = (app) => {
    /* untuk memanggil controllers yang sudah dibuat */
    const orders = require('../controllers/order.controller')
    /* membuat router dari express */
    const router = require('express').Router()

    /* mengarahkan object product dari controllers lalu panggil app,js*/
    router.get('/user/:id', orders.findOrder)

    /* registrasikan router */
    app.use('/api/order', router)
}

/* registrasikan kedalam entry point */