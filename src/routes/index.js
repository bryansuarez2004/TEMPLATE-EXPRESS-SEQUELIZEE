const express = require('express');
const userRouter = require('./user.router');
const serviceRouter = require('./service.router');
const userServiceRouter = require('./userService.router');
const treatmentRouter = require('./treatment.router');
const userTreatmentRouter = require('./userTreatment.router');
const sessionRouter = require('./session.router');

const router = express.Router();

// Definir rutas aquí

router.use('/users',userRouter)
router.use('/services',serviceRouter)
router.use('/userServices',userServiceRouter)
router.use('/treatments',treatmentRouter)
router.use('/userTreatments',userTreatmentRouter)
router.use('/sessions',sessionRouter)


module.exports = router;