//? Funcion que retorna el middleware normal de cada controladory ejecuta el controlador pasado como parametro que retorna una promesa para hacer un catch en caso haya un error
const catchError = controller => {
    
    
    return (req, res, next) => {
        controller(req, res, next)
        .catch(err => {
            console.log('capturando error y funcionando CATCHERROR') // Mostrar el error en la consola
            next(err); // Pasar el error al middleware de manejo de errores
        });
    }
}

module.exports = catchError