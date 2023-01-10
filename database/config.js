import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const dbConnection = async() => {
    
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos ONLINE');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la Base de Datos');
    }
}



export {
    dbConnection
}