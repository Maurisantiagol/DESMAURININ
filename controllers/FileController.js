
/**
 * Main file controller
 */
class FileController{
    /**
     * @param {Object} req Objeto request
     * @param {Object} res Objeto respuesta
     * @param {function} next Callback
     * @return {Object} res The response object
     */
    subirArchivo = async (req, res, next) =>{
        const archivo = req.files.archivo;
        const fileName = archivo.name;
        const path = __dirname + '/../uploads/' + fileName;

        try {
            archivo.mv(path, (error) => {
                if (error) {
                    console.error(error);
                    res.writeHead(500, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({ status: 'error', message: error }));
                    return;
                }
                return res.status(200).send({ status: 'success', path:'/uploads/' + fileName });
            });
        } catch (e) {
            res.status(500).json({
                error: true,
                message: e.toString()
            });
        }
    }
}

module.exports = FileController;