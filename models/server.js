import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/user.js';
dotenv.config();


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Parseo y lectura del BODY
        this.app.use( express.json() );

        // Directorio Public
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.usuariosPath, router);
    }

    listen() {
        this.app.listen( this.port, ()=>{
            console.log(`Escuchando en el puerto => ${ this.port }`);
        });
    }
}


export default Server;