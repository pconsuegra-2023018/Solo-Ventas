
import express from "express"
import { encrypt } from '../utils/encrypt.js'
import User from '../src/users/user.model.js'
import productRoutes from '../src/products/product.routes.js'
import categoryRoutes from '../src/categories/category.routes.js'
import userRoutes from '../src/users/user.routes.js'
import carRoutes from  '../src/shopping-cart/cart.routes.js'
import invoiceRoutes from '../src/invoices/invoice.routes.js'
import morgan from "morgan"
import helmet from "helmet"
import cors from 'cors'

const config = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/products',productRoutes)
    app.use('/v1/categories',categoryRoutes)
    app.use('/v1/users',userRoutes)
    app.use('/v1/cart',carRoutes)
    app.use('/v1/invoices',invoiceRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        config(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port:${process.env.PORT} 💣`)
    }catch(err){
        console.error('Server init failed' , err)
    }

}

export const addAdmin =async()=>{
    try {
        let userAdmin = await User.findOne({role: 'ADMIN'})
        if(!userAdmin){
            const passEncrypt = await encrypt('holaMundo1234')
            userAdmin = await User.create(
                {
                  name: 'Paolo Isaac',  
                  surname: 'Consuegra Martinez',
                  username: 'pconsuegra-2023018',
                  email: 'pconsuegra-2023018@gmail.com',
                  password: passEncrypt,
                  phone: '33220568',
                  role: 'ADMIN'
                }
            )
            return console.log('Admin created: ', userAdmin.username)
        }
        return console.log('Admin already exists')

    } catch (error) {
        console.error(error)
        return console.log('Generale Error')
    }
}
