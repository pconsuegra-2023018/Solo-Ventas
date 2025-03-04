'use strict'
import Category from '../categories/category.model.js'

export const saveCategory= async(req, res)=>{
    try {
            let data = req.body
            let category = new Category(data)
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
                        message: 'General error with registering category', error
                    }
                )
        }
}

export const getAll = async(req, res)=>{
    try {
        let category = await Category.find()
        if(!category)return res.status(404).send(
            {
                success: false,
                message: `Categories don't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Categories found', 
                    category: category

                }
            )
    } catch (error) {
        console.error(error)
            return res.status(500).send(
                {
                    message: 'General error with category', error
                }
            )
    }
}

export const getCategory = async(req, res)=>{
    try {
        let {id} = req.params
        let category = await Category.findById(id)
        if(!category)return res.status(404).send(
            {
                success: false,
                message: `Category doesn't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Category found', 
                    category: category

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
        let category = await Category.findByIdAndUpdate(id,data,{new:true})
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
        let category = await Category.findByIdAndDelete(id)
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