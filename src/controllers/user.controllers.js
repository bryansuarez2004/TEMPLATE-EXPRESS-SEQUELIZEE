const catchError = require('../utils/catchError')
const User =require('../models/User')



const getAll = catchError(async(req,res)=>{
      const users = await User.findAll()
   

       res.json(users) 
    })

const create = catchError(async(req,res)=>{
    
    const newUser = await User.create(req.body)

   res.status(201).json(newUser)
    
    
})    



module.exports = {
    getAll,
    create
}