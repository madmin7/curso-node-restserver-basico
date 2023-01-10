import { Schema, model } from 'mongoose'; 

    // {
    //     nombre: '',
    //     correo: '',
    //     password: '',
    //     img: '',
    //     rol: [],
    //     estado: bool,
    //     google: bool
    // }


const usuarioSchema = Schema({
        nombre: {
            type: String,
            require: [ true, 'El nombre es obligatorio']
        },
        correo: {
            type: String,
            require: [ true, 'El mail es obligatorio'],
            unique: true
        },
        password: {
            type: String,
            require: [ true, 'La contrasenia es obligatorio'],
        },
        img: {
            type: String,
        },
        rol: {
            type: String,
            require: true,
            enum: ['ADMIN_ROL', 'USER_ROL']
        },
        estado: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        }
});

usuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

export default model( 'Usuario', usuarioSchema ); 