const express = require('express');
const { getAll, create, update } = require('../controllers/treatment.controllers');



const treatmentRouter = express.Router();

treatmentRouter.route('/')
    .get(getAll)
    .post(create)


treatmentRouter.route('/:id') 
     .put(update)   


module.exports = treatmentRouter;