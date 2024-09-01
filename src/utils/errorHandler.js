const errorHandler = (error, _req, res, _next) => {
   console.log('ATRAPADO POR EL MIDDLEWARE DE ERROR // hubo error');
   

    if(error.name === 'SequelizeValidationError') {
         console.log('primer error');
         
        
        const errObj = {};
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        return res.status(400).json(errObj);
    }
    if(error.name === 'SequelizeForeignKeyConstraintError'){
        console.log('segundo error');

        return res.status(400).json({ 
            message: error.message,
            error: error.parent.detail
        });
    }
    if(error.name === 'SequelizeDatabaseError'){
        console.log('tercer error');

        return res.status(400).json({ 
            message: error.message
        });
    }

    if(error.name === 'SequelizeUniqueConstraintError') {
        console.log('cuerto error');
        
        
        const errObj = {message: error.parent.detail};
       
        return res.status(400).json(error);
    }
    console.log('global error');

    return res.status(500).json({
        message: error.message,
        error: error
    });
}

module.exports = errorHandler;