const express = require('express');
const { getAll, create, update, searchByName, getOne } = require('../controllers/user.controllers');


const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)
    .post(create)

userRouter.route('/search')
    .get(searchByName)    

userRouter.route('/:id')
    .put(update)    
    .get(getOne)

module.exports = userRouter;