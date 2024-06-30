import mongoose from 'mongoose';

const { Schema, models, model, ObjectId } = mongoose;

const SalesSchema = new Schema({
    usuario: {type:ObjectId, required: true, ref:"usuarios"},
    total : {type: Number, required: true},
    direccion: {type:String, required: true},
    productos: [{type:ObjectId, required: true, ref:"product"}],
},{ timestamps: true })

const Ventas = models.ventas || model('ventas',SalesSchema)

export default Ventas