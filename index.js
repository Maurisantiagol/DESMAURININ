const express = require('express');
const router = express.Router();

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

var port = 3000;
app.listen(port, function () {
    console.log('Server', process.pid, 'listening on port', port);
});

module.exports = app; 
