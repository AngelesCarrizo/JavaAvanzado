import mongoose from 'mongoose';

const { Schema, models, model, ObjectId} = mongoose;

const ProductSchema = new Schema({
    categoria: {type: ObjectId, required: true, ref:"category"},
    nombre: {type: String, required:true, unique: true},
    desc: {type: String, required: true},
    precio: {type: Number, required: true},
    imagen:{type: String, required: true},
    stock: {type: Number, default:0}
})

const Product = models.product || model('product',ProductSchema)

export default Product