import  jwt  from 'jsonwebtoken';



const generarJWT = ( usuarioID = '' ) => {
    return new Promise( ( res, rej ) => {
        const payload = { usuarioID };

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: '5h'
        }, ( err, token ) => {
            if(err){
                console.log(err);
                rej('No se pudo generar el TOKEN');
            }

            res(token);
        })
    })
}



// const generarJWT3 = ( uid = '') => {

//     return new Promise( (res, rej) => {
//     const payload = {uid};

//     jwt.sign( payload, process.env.SECRETKEY, { expiresIn: '4h' }, (err, token) => {
//         if( err ) {
//             console.log(err);
//             rej( err );
//         }

//         res( token )
//     })

// })
// }




export {
    generarJWT
}