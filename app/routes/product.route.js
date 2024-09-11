
module.exports = (app) => {
    /* untuk memanggil controllers yang sudah dibuat */
    const products = require('../controllers/product.controller')
    /* membuat router dari express */
    const router = require('express').Router()

    /* mengarahkan object product dari controllers lalu panggil app,js*/
    router.get('/', products.findAll)

    /* registrasikan router */
    app.use('/api/products', router)
}