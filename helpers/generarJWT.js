import  jwt  from 'jsonwebtoken';

const generarJWT = ( usuarioID = '' ) => {
    return new Promise( ( res, rej ) => {
        const payload = { usuarioID };

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: '1d'
        }, ( err, token ) => {
            if(err){
                console.log(err);
                rej('No se pudo generar el TOKEN');
            }

            res(token);
        })
    })
}


export {
    generarJWT
}