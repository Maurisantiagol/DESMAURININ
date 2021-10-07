const { Router } = require('express')
const FileController = require('../controllers/FileController');

/**
 * Class to manage routes
 */
class RouteManager
{
    /**
     * Constructor
     *
     * @var {Object} app Instancia de la app
     * @constructor
     */
    constructor(app)
    {
        this.router = Router();
        this.fileController = new FileController();
        this.app = app;
    }

    /**
     * Configura las rutas
     *
     * @return {void}
     */
    config (){

       
        
        this.router.post('/subir-archivo', this.fileController.subirArchivo);
        

        this.router.use(function(req, res) {
            res.status(404).json({
                error: true,
                message: 'Not Found'
            });
        });

        this.app.use('/api', this.router);
    }
}

module.exports = RouteManager;