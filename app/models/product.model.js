module.exports = mongoose => {
    const schema = mongoose.Schema({
        code: String,
        name: String,
        price: Number,
        image: String,
        description: String,
        quantity: Number,
    })

    /* Nilai _id pada monggodb akan diubah id yang sudah dibuat */
    schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
    });

    /* membuat model untuk monggodb */
    const Product = mongoose.model("products", schema);
    return Product;
}


