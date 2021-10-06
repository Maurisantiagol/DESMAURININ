



//function cifrardescifrar(){
    const crypto = require("crypto-js"); 
    const fs = require("fs");
    let archivo, mensaje;
    archivo = "prueba.txt"; 
    mensaje = fs. readFileSync(archivo, 'utf8');
    console.log("El contenido del txt es: "); 
    console.log(mensaje); 
    console.log("");
   
       // function cifrardes(){
            
            let encriptar = crypto.DES.encrypt(mensaje, "Secret Passphrase").toString();
            console.log("El mensaje encriptado es: "); 
            console.log(encriptar); 
            console.log("");
        //}
       // function descifrardes(){
            let desencriptar = crypto.DES. decrypt(encriptar, "Secret Passphrase");
            console.log("El mensaje desencriptado es: "); 
            console.log(desencriptar.toString(crypto.enc.Utf8)); 
            console.log("");
       // }
//}