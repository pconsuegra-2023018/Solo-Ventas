
import express from "express"
import productRouter from '../src/products/product.router.js'
import categoryRouter from '../src/categories/category.router.js'

const config = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
}

const routes = (app)=>{
    app.use('v1/products',productRouter)
    app.use('v1/categories',categoryRouter)
}

export const initServer = ()=>{
    const app = express()
    try{
        config(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port:${process.env.PORT} `)
    }catch(err){
        console.error('Server init failed' , err)
    }

}
