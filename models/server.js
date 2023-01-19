import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
    routerUsuarios,
    routerAuth,
    routerCategorias,
    routerProductos,
    routerBuscar
} from '../routes/index.js';

import { dbConnection } from '../database/config.js';


dotenv.config();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:        '/api/auth',
            buscar:      '/api/buscar',
            categorias:  '/api/categorias',
            usuarios:    '/api/usuarios',
            productos:   '/api/productos',
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }


    async conectarDB() {
        await dbConnection();
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
        this.app.use( this.paths.auth, routerAuth);
        this.app.use( this.paths.buscar, routerBuscar);
        this.app.use( this.paths.categorias, routerCategorias);
        this.app.use( this.paths.productos, routerProductos);
        this.app.use( this.paths.usuarios, routerUsuarios);
    }

    listen() {
        this.app.listen( this.port, ()=>{
            console.log(`Escuchando en el puerto => ${ this.port }`);
        });
    }
}


export default Server;