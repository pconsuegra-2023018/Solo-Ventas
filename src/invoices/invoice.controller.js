import Invoice from '../invoices/invoice.model.js'
import Product from '../products/product.model.js'
import Cart from '../shopping-cart/cart.model.js'

export const addInvoice = async(req,res) =>{
    try {
        let {user} = req
        let cart = await Cart.findOne({user: user.id})//busca carrito del usuario logeado
        let invoice = new Invoice({
            user: user.id,
            products: [],
            total: 0
        });
        for (let i = 0; i < cart.products.length; i++) {
            let product = await Product.findById(cart.products[i].product)// busca el producto en orden del carrito
            invoice.products.push(//agrega el producto en el arraylist de factura
                {
                    product: product
                }
            )
            invoice.total = invoice.total + product.price//acumulador para el total
            await Product.updateOne({_id: product._id}, { $inc:{stock: -1}})//$inc es para valores numericos
            await Product.updateOne({_id: product._id}, { $inc:{sold: 1}})
        }
        await invoice.save()
        return res.status(200).send(
            {
                success:true,
                message: 'Invoice created successfully'
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


export const getInvoiceById = async(req,res)=>{
    try {
        let {id} = req.params
        let invoice = await Invoice.findById(id)
            .populate('user','name username -_id')
            .populate(
                {
                    path:'products',
                    populate:{path:'product',select:'name price -_id'}
                })
        if(!invoice)return res.status(404).send(
            {
                success: false,
                message: `Invoice doesn't found`
                
            }
        )
        return res.status(200).send(
            {   
                success: true,
                message: 'Invoice found', invoice

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

export const getInvoices = async(req,res)=>{
    try {
        let {user} = req
        let invoice = await Invoice.find({user: user.id})
            .populate('user','name username -_id')
            .populate(
                {
                    path:'products',
                    populate:{path:'product',select:'name price -_id'}
                })
        if(!invoice)return res.status(404).send(
            {
                success: false,
                message: `Invoices don't found`
                
            }
        )
        return res.status(200).send(
            {   
                success: true,
                message: 'Invoices found', invoice

            }
        )
    } catch (error) {
        
    }
}

export const updateInvoice = async(req,res)=>{
    try {
        let {user} = req
        let {id} = req.params
        let invoice = await Invoice.findById(id)
        if(invoice.user != user.id){
            return res.status(403).send(
                {   
                    success: false,
                    message: 'Unauthorized'
    
                }
            )
        }else if(!invoice){
            return res.status(404).send(
                {   
                    success: false,
                    message: `Invoices doesn't found`
    
                }
            )
        }

        await Invoice.updateOne({_id: invoice._id},{$set:{status:true}})
        return res.status(200).send(
            {   
                success: true,
                message: 'Invoice updated', invoice

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