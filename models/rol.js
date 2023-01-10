import { Schema, model } from 'mongoose'; 


const rolSchema = Schema({
    rol: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
});


export default model( 'Rol', rolSchema ); 