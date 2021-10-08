const crypto = require('crypto-js');
const fs = require("fs");
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const FileController = require('./controllers/FileController');
const app = express();
const fileController = new FileController();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

router.post('/subir-archivo', fileController.subirArchivo);

router.use(function(req, res) {
    res.status(404).json({
        error: true,
        message: 'Not Found'
    });
});

app.use('/api', router);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.render('index.html');
});
var port =  process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Server', process.pid, 'listening on port', app.get('port'));
});

module.exports = app; 
app.post("/cifrar", (req, res) => {
    let archivo, mensaje;
    let inputPassword="";
    let Contenido ="";
   Contenido = req.files.subir_archivo.name;
  inputPassword = req.body.Password;

console.log(inputPassword);
  archivo = __dirname + '/uploads/' +Contenido; 
    mensaje = fs. readFileSync(archivo, 'utf8');
    console.log("El contenido del txt es: "); 
    console.log(mensaje); 
    console.log("");
    let encriptar = crypto.DES.encrypt(mensaje, inputPassword).toString();
    console.log("El mensaje encriptado es: "); 
    console.log(encriptar); 
    console.log("");
      
       fs.writeFileSync(__dirname + '/uploads/' +Contenido, ""+encriptar);
        
       res.download(__dirname + '/uploads/' +Contenido);
             
            

});
app.post("/descifrar", (req, res) => {
    let inputPassword="";
    let Contenido ="";
   Contenido = req.files.subir_archivo.name;

   const Contenido2 = Contenido.slice(0, -4);
  inputPassword = req.body.Password;
  console.log(inputPassword);

    let archivo, mensaje;
    archivo = __dirname + '/uploads/' +Contenido; 
    mensaje = fs. readFileSync(archivo, 'utf8');
    console.log("El contenido del txt es: "); 
    console.log(mensaje); 
    console.log("");

    let desencriptar = crypto.DES. decrypt(mensaje.toString(), inputPassword).toString(crypto.enc.Utf8);
    console.log("El mensaje desencriptado es: "); 
    console.log(desencriptar.toString(crypto.enc.Utf8)); 
    console.log("");
    fs.writeFileSync(__dirname + '/uploads/' +Contenido2+"(1).txt", ""+desencriptar);

    res.download(__dirname + '/uploads/' +Contenido2+"(1).txt");
});
app.post("/index", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

