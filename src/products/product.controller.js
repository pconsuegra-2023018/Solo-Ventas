'use strict'
import Producto from '../products/product.model.js'



export const saveProduct = async(req, res)=>{
    try {
        let data = req.body
        let product = new Producto(data)
        await product.save()
        return res.send(
            {
                success: true,
                message: `Registered successfly`
            }
        )
    } catch (error) {
        console.error(error)
            return res.status(500).send(
                {
                    message: 'General error with registering product', error
                }
            )
    }
}

export const getAll = async(req, res)=>{
    try {
        let product = await Producto.find().populate('categoria') 
        if(!product)return res.status(404).send(
            {
                success: false,
                message: `Products don't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Products found', product: product

                }
            )
    } catch (error) {
        console.error(error)
            return res.status(500).send(
                {
                    message: 'General error', error
                }
            )
    }
}

export const getProduct = async(req, res)=>{
    try {
        let {id} = req.params
        let product = await Producto.findById(id).populate('categoria')
        if(!product)return res.status(404).send(
            {
                success: false,
                message: `Product doesn't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Product found', product: product

                }
            )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error', error
            }
        )
        
    }
}

export const updateProduct = async(req,res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let product = await Producto.findByIdAndUpdate(id,data,{new:true})
        if(!product)return res.status(404).send(
            {
                success: false,
                message: `Product doesn't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Product updated', product: product

                }
            )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error', error
            }
        )
        
    }
}

export const deleteProduct = async(req, res)=>{
    try {
        let {id} = req.params
        let product = await Producto.findByIdAndDelete(id)
        if(!product)return res.status(404).send(
            {
                success: false,
                message: `Product doesn't found`
                
            }
        )
        return res.send(
            {   
                success: true,
                message: 'Product deleted'

            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error', error
            }
        )
    }
}