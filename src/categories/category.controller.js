'use strict'
import Categoria from '../categories/category.model.js'

export const saveCategory= async(req, res)=>{
    try {
            let data = req.body
            let category = new Categoria(data)
            await category.save()
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
        let category = await Categoria.find()
        if(!category)return res.status(404).send(
            {
                success: false,
                message: `Categories don't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Categories found', product: category

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

export const getCategory = async(req, res)=>{
    try {
        let {id} = req.params
        let category = await Categoria.findById(id)
        if(!category)return res.status(404).send(
            {
                success: false,
                message: `Category doesn't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Category found', category: category

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

export const updateCategory = async(req,res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let category = await Categoria.findByIdAndUpdate(id,data,{new:true})
        if(!category)return res.status(404).send(
            {
                success: false,
                message: `Category doesn't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Category updated', category: category

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

export const deleteCategory = async(req, res)=>{
    try {
        let {id} = req.params
        let category = await Categoria.findByIdAndDelete(id)
        if(!category)return res.status(404).send(
            {
                success: false,
                message: `Category doesn't found`
                
            }
        )
        return res.send(
            {   
                success: true,
                message: 'Category deleted'

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