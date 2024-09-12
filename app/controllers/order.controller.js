
/* panggil dari model index */
const db = require('../models');
/* object order */
const Order = db.orders

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
        { 
        /* Mengubah tipe data cart_items menjadi Number */
        $addFields: { 
            cart_items: { 
                $map: { 
                    input: "$cart_items", 
                    as: "item", 
                    in: { $toInt: "$$item" } // Mengonversi setiap item dalam cart_items menjadi Number
                }
            }
        }
    },
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
}

/* Lalu buatkan routernya */



