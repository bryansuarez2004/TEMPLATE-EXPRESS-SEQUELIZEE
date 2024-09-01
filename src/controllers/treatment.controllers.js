const catchError = require('../utils/catchError');
const Treatment = require('../models/Treatment');


const getAll = catchError(async(req, res) => {
    const results = await Treatment.findAll();
    return res.json(results);
});


const create = catchError(async(req,res) =>{
    const {name,initPrice} = req.body
    console.log(req.body);
    
    const body = {name,initPrice}


    const result = await Treatment.create(body);
    return res.status(201).json(result);
})


const update = catchError(async(req, res) => {
    const { id } = req.params;
    
    const result = await Treatment.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404).json({message:'not found'});
    return res.json(result[1][0]);
});


module.exports = {
    getAll,
    create,
    update
}