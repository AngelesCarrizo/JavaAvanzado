import mongoose from 'mongoose';

const { Schema, models, model} = mongoose;

const UsuariosSchema = new Schema({
    nombre: {type: String, required:true, unique: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true},
    contraseña:{type: String, required: true}
    
})

const Usuarios = models.usuarios || model('usuarios',UsuariosSchema)

export default Usuarios