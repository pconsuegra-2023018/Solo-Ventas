'use strict'
import Cart from './cart.model.js'
import Product from '../products/product.model.js'


//seria agregar producto, se crea el carrito automaticamente unicamente recolectando el usuario, luego crear un addproduct en el cual se meta el addcart, en params de la ruta que vaya
// el id del carrito y solo se agreguen productos en el body, a su vez luego se descuente del stock, con validaciones, tabmien habra que llamar a Prodcuts de su modelo para comparar el stock
export const addCart = async(req,res,next)=>{
    try {
        let {user}= req
        let cartexist = await Cart.findOne({user: user.id})
        if(cartexist) return next()

        let cart = new Cart()
        cart.user = user.id
        await cart.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Cart craeted successfully'
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err: error
            }
        )
    }
}

export const addProduct = async(req,res)=>{
    try {
        let {id} = req.params // extraer el id del carrito
        let {user} = req//usuario loggeado, de la inyeccion de validate.jwt
        let cart = await Cart.findById(id)
        if(cart.user != user.id.toString()) return res.status(500).send({message: 'Loggin error'})//VERIFICAR USUARIO LOGEADO CON EL CARRITO
            let data = req.body //data del body en postman
            let producto = await Product.findById(data.product)//agarro el id escrito en producto de data
            if(!producto) return res.status(404).send({message: `product not found`})//si no existe que escriba producto no econtrado ,en la consola de postman
            let subtotal = 0//definimos variable por si no hay  ningun producto agregado previamente
            if(cart.products.length > 0){//verificamos si hay productos, y si hay alguno se le da el valor a subtotal
                 subtotal = cart.products[cart.products.length -1].subtotal//agarro el subtotal del ultimo producto agregado para que se sume con el nuevo
            }
                cart.products.push(//si existe el producto, agregarlo
                {
                    product: producto,//producto agregado mediante Id
                    subtotal: producto.price + subtotal//sumo el precio del producto con el precio del producto anteriormente agregado para que se vaya formando un subtotal
                }
                )
                cart.total = cart.products[cart.products.length - 1].subtotal
            await cart.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Product added'
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err: error
            }
        )
    }
}

export const getAll = async(req, res)=>{
    try {
        let cart = await Cart.find().populate('user')
        if(!cart) return res.status(404).send(
            {
                success: false, 
                message: `Carts don't found`
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Carts found :', cart
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err: error
            }
        )
    }
}

export const getCartProfile = async(req,res)=>{
    try {
        let {user} = req
        let cart = await Cart.findOne({user: user.id})
        if(!cart) return res.status(404).send(
            {
                success: false, 
                message: `Cart doesn't found`
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Cart found :', cart
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err: error
            }
        )
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        let {id} = req.params //el id del producto
        let {user} = req //datos del usuario loggeado y dueño del carrito actual
        let product = await Product.findById(id)// busca el producto
        if(!product) return res.status(404).send({message: 'Product do not exist'})//verifica si existe el producto
        let cart = await Cart.findOne({user: user.id})//busca el carrito del usuario loggeado
        if(!cart) return res.status(404).send({message: 'Cart do not exist'})
        for (let i = 0; i < cart.products.length; i++) {
            if(cart.products[i].product == product._id.toString()){//product._id también puede ser reemplazado por solamente el id de params
                cart.products.splice(i, 1)
                //ACTUALIZAR SUBTOTAL
                for (let j = 0; j < cart.products.length; j++) {
                    let uid = cart.products[j].product//objetgo el id del producto del carrito
                    let producto = await Product.findById(uid)//busco el producto en su entidad
                    if(j == 0){//se actualiza el precio del primer elemento del arraylist
                        cart.products[j].subtotal = producto.price
                    }else if(j !== 0){
                    cart.products[j].subtotal = producto.price + cart.products[j-1].subtotal//se actualiza el precio del siguiente elemento y se le suma el precio del producto anterior
                    }
                }
                cart.total = cart.products[cart.products.length - 1].subtotal

                await cart.save()

                return res.status(200).send(
                    {
                      success: true,
                      message: 'Product deleted'  
                    }
                )
            }
            
        }
        
        return res.status(404).send(
            {
                success:false, 
                message:'Product not found'
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err: error
            }
        )
    }
}

export const cleanCart = async(req, res, next)=>{
    try {
        let id = req.params
        let {user} = req
        let cart = await Cart.findById(id)
        if(!cart){
             return res.status(404).send(
            {
                success: false, 
                message: `Cart doesn't found`
            }
        )
        }else if(cart.user != user._id){
            return res.status(500).send(
                {
                    success:false,
                    message: `Unauthorized`
                }
            )
        }
        
       cart.products.length = 0
        return res.status(200).send(
            {
                success: true,
                message: 'Cart cleaned'
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err: error
            }
        )
    }
}   