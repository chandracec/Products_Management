const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },  
    currencyId: { type: String, required: true },  
    currencyFormat: { type: String, required: true }, // currencyFormat  = Rs
    isFreeShipping: { type: Boolean, default: false, lowercase: true },
    productImage: { type: String, required: true },
    style: { type: String },
    availableSizes: { type: [String], enum: ["S", "XS", "M", "X", "L", "XXL", "XL"] },
    installments: { type: Number },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true })


module.exports = mongoose.model("product", productSchema)




