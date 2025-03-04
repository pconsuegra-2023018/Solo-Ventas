'use strict'

import jwt from 'jsonwebtoken'
import { findUser } from '../utils/db.validators.js'

export const validateJwt = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        let user = jwt.verify(authorization, secretKey)
        const validateUser = await findUser(user.id)
        if(!validateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found - unauthorized'
            }
        )
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: `You don't have access | username ${user.username}`
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}

export const isCLient = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user || user.role !== 'CLIENT') return res.status(403).send(
            {
                success: false,
                message: `You don't have access | username ${user.username}`
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}