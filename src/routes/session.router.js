const express = require('express');
const { getAll, create, update, remove, getByUser } = require('../controllers/session.controllers');


const sessionRouter = express.Router();

sessionRouter.route('/')
    .get(getAll)
    .post(create)

sessionRouter.route('/user/:idUser')
    .get(getByUser)

sessionRouter.route('/:sessionId')
    .put(update)    
    .delete(remove)





module.exports = sessionRouter;