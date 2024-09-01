const catchError = require('../utils/catchError');
const Service = require('../models/Service');


const getAll = catchError(async(req, res) => {
    const results = await Service.findAll();
    return res.json(results);
});


const create = catchError(async(req,res) =>{
    const {name,initPrice} = req.body
    console.log(req.body);
    
    const body = {name,initPrice}


    const result = await Service.create(body);
    return res.status(201).json(result);
})


const update = catchError(async(req, res) => {
    const { id } = req.params;
    
    const result = await Service.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404).json({message:'not found'});
    return res.json(result[1][0]);
});
const remove = catchError(async(req,res) =>{
    const { id } = req.params;
    const result = await Service.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);

})


module.exports = {
    getAll,
    create,
    update,
    remove
}