'use strict'

import User from '../users/user.model.js'
import { encrypt, checkPassword } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import { addCart } from '../shopping-cart/cart.controller.js'

export const register = async(req, res)=>{
    try{
        
        let data = req.body
        
        let user = new User(data)
     
        user.password = await encrypt(user.password)
     
        await user.save()
       
        return res.send({message: `Registered successfly, can be logged with username: ${user.username} `})
    }catch(error){
        console.error(error)
        return res.status(500).send({message: 'General error with registering user', error})
    }
}

export const login = async(req,res,next)=>{
    try{
        let {userLoggin, password} = req.body
        
        let user = await User.findOne(
            {
                $or:[
                    {email: userLoggin},
                    {username: userLoggin}]
            }
        )
        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                id : user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            if(user.role === 'CLIENT')
            {
            req.user = user
            addCart(req, res, next)
            return res.send({ 
                message: `Welcome ${user.name}`,
                loggedUser,
                token
            })
            }
            return res.send({ 
                message: `Welcome ${user.name}`,
                loggedUser,
                token
            })
            
        }


        
        return res.status(400).send(
            {
                success: false,
                message:'Invalid credentials'
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with login function',err
            }
        )
    }
}
//solo admin
export const getUser = async(req,res)=>{
    try{
        const {limit = 20, skip=0} = req.query
        let users = await User.find()
            .skip(skip)
            .limit(limit)

        if(!users) return res.status(404).send(
            {
                success: false,
                message: `Users don't found`   
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Users found', user: users
                }
            )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err: error
            }
        )
    }
}

export const getUserById = async(req,res)=>{
    try{
        let usert = req.user
        let user = await User.findById(usert.id)
        if(!user) return res.send(
            {
                success: true,
                message: `User don't found`
            }
        )
            return res.send(
                {
                    success: true,
                    message: 'Your profile ', user
                }
            )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Generate Error', error
            }
        )
    }
}
 
export const updateUser = async(req,res)=>{
    try{
    let {id} = req.params
    let usert = req.user
    if(id !== usert.id.toString()) return res.status(400).send({message: 'Invalid credentials'})
    let data = req.body
    let user = await User.findByIdAndUpdate(id,data,{new:true})
        return res.send(
            {
                success: true,
                message: 'User updated', 
                user: user
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Generate Error', err: error
            }
        )
    }
}
 
export const deleteUser = async(req,res)=>{
    try{
        //validaciones para que se asegure si esta seguro de borrar su perfil
        let {id} = req.params
        let usert = req.user
        if(id !== usert.id.toString()) return res.status(400).send({message: 'Invalid credentials'})
        let user = await User.findById(id)
        if(!user) return res.send(
            {
                success: false,
                message: `User don't found`
            }
        )
        /* user.status = false
            await user.save() */
        await User.updateOne({_id:user._id},{$set: {status: false}})
        return res.send(
            { 
                success: true,
                message: 'Users deleted'
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Generate Error', err: error
            }
        )
    }
}
//HACER VALIDATE.JWT
//HACER RUTAS
// HACERLO CON TOKEN, EXTRAER USUARIO DE TOKEN Y COMPARAR CON REQ.USER
export const updatePassword=async(req,res)=>{
    try{
        let tuser = req.user
        let {oldPassword, newPassword} =req.body
        let user = await User.findOne({_id: tuser.id})
        if(await  checkPassword(user.password, oldPassword)){
            await User.updateOne({username: user.username},{ $set:{password:await encrypt(newPassword)} })
            
            return res.send(
                {
                    success: true,
                    message:'Password updated', user
                }
            )
        }
        return res.status(400).send(
            {
                success: false,
                message: 'Invalid credentials'
            }
        )
    }catch(error){
        console.error(error)
        return res.status(400).send(
            {
                success: false,
                message: 'General Error ' ,  error
            }
        )
    }
}