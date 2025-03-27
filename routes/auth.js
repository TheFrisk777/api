const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const router= express.Router();

router.post('/register',async(req,res)=>{
        const  {username,email,password}=req.body;
        try{
            const userExist=await User.findOne({email});
            if(userExist)return res.status(400).json({message:'Usuario ya existe'});
            const newUser= new User({username,email,password});
            await newUser.save();
            res.status(201).json({message:"usuario creado exitosamente"});

        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
);

router.post('/login',async(req,res)=>{
        const {email,password}=req.body;
        try{
            const user= await User.findOne({email});
            if(!user)return res.status(404).json({message:'Usuario no encontrado'});
            const isMatch=await user.comparePassword(password);

            if(!isMatch)return res.status(400).json({message:'Contraseña incorrecta'});

            const token=jwt.sign({id:user._id},'secreto',{expiresIn:'1h'});
            res.json({token});

        }catch(error){
            res.status(500).json({message:"Error en el servidor"});
        }
    }
);

module.exports=router;


