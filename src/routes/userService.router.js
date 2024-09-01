const express = require('express');
const { getAll, create, getByDate, getByUser } = require('../controllers/userService.controllers');


const userServiceRouter = express.Router();

userServiceRouter.route('/')
.get(getAll)
.post(create)

userServiceRouter.route('/date/:date')
.get(getByDate)

userServiceRouter.route('/:idUser')
.get(getByUser)
    

module.exports = userServiceRouter;