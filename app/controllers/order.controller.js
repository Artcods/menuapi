
/* panggil dari model index */
const db = require('../models');
/* object order */
const Order = db.orders

/* untuk menampilkan seluruh cart yang ditambahkan */
/* data order memiliki dari user */
exports.findOrder = (req, res) => {
    const id = Number(req.params.id) // membuat menjadi number untuk samakan dari model

    /* Menambahkan proses agrigate untuk join */
    Order.aggregate([{ 
        /* Menemukan order yang user_id sama */
        $match: { 
            user_id: id // match(where(user_id))
        } 
    }, 
    /* { 
        $addFields: { 
            cart_items: { 
                $map: { 
                    input: "$cart_items", 
                    as: "item", 
                    in: { $toInt: "$$item" } // Mengonversi setiap item dalam cart_items menjadi Number
                }
            }
        }
    }, */
    {
        /* Aggregasi yang mencari semua barang yang dibeli oleh user */
        $lookup: {
            from: 'products', // membuat join dengan product
            localField: 'cart_items', // field yang diambil di order / field mana yang mau diambil
            foreignField: 'code', // field yang diambil di product / dicocokan yang mana 
            as: 'products' // nama array baru yang akan dibuat / hasil yang dari lookup akan masukkan kedalam field
        }
    }]).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || 'Error retrieving orders.'
        })
    })
}/* Lalu buatkan routernya */

/* Untuk menambahkan item ke cart */
/* kita mencari order berdasarkan user id dan ditambahkan data kedalam ke cart ke addToSet  */
exports.addToCart = (req, res) => {
    const id = Number(req.params.id)
    /* mengirimkan data json didalam body req kita sehingga jika ingin mendapatkan nilai kita menggunakan perintah req.body */
    const productCode = String(req.body.product)

    Order.updateOne({
        user_id: id
    },
    {
        /* melakukan query untuk menambahkan data didalam array (tidak boleh nilai sama) */
        $addToSet: {
            /* untuk menghidari jika didalam field sudah ada code product yang sudah dikirimkan tidak boleh sama */
            cart_items: productCode
        }
    }).then((result) => [
        res.send(result)
    ]).catch((err) => {
        res.status(409).send({
            message: err.message || 'Error updating cart.'
        })
    })
}/* Lalu buatkan routernya */


/* Membuat penghapusan data */
exports.removeFromCart = (req, res) => {
    const id = Number(req.params.id)
    /* mengirimkan data json didalam body req kita sehingga jika ingin mendapatkan nilai kita menggunakan perintah req.body */
    const productCode = String(req.params.product)

    Order.updateOne({
        user_id: id
    },
    {
        /* melakukan query untuk menambahkan data didalam array (tidak boleh nilai sama) */
        $pull: {
            /* untuk menghidari jika didalam field sudah ada code product yang sudah dikirimkan tidak boleh sama */
            cart_items: productCode
        }
    }).then((result) => [
        res.send(result)
    ]).catch((err) => {
        res.status(409).send({
            message: err.message || 'Error updating cart.'
        })
    })
}/* Lalu buatkan routernya */



