import { Schema, model } from 'mongoose';


const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean, 
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})


categoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...categoria } = this.toObject();
    categoria.nombre.toUpperCase();
    return categoria;
}

export default model( 'Categoria', categoriaSchema );