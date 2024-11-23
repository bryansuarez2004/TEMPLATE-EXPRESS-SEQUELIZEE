const catchError = require('../utils/catchError');
const User = require('../models/User');
const { Op } = require('sequelize');


const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});


const getOne = catchError(async(req, res) =>{
   
        const { id } = req.params;
        const result = await User.findByPk(id);
        if(!result) return res.sendStatus(404);
        return res.json(result);
    
})

const searchByName = catchError(async(req,res)=>{
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({message:'debe proporcionar algo para buscar'});
    }

    // Búsqueda rápida en el campo fullName con coincidencias parciales
    const users = await User.findAll({
        attributes: ['id', 'fullName'], // Solo trae el id y el nombre completo
        where: {
            fullName: {
                [Op.like]: `%${name}%` // Busca coincidencias en cualquier parte del nombre
            }
        },
        limit: 10 // Limita la cantidad de resultados para mejorar la velocidad
    });

    if (users.length === 0) return res.status(400).json({message:'no se encontraron resultados'})
    return res.status(200).json(users);
})

const create = catchError(async(req,res) =>{
    const {fullName,phone,birthday} = req.body
    console.log(req.body);
    
    const body = {fullName,phone,birthday}


    const result = await User.create(body);
    return res.status(201).json(result);
})

const update = catchError(async(req, res) => {
    const { id } = req.params;
    
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404).json({message:'not found'});
    return res.json(result[1][0]);
});


module.exports = {
    getAll,
    create,
    update,
    searchByName,
    getOne
}