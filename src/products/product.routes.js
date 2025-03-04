import { Router } from "express";
import {getAll, getProduct, getSold, getProductByCategory, saveProduct, updateProduct, deleteProduct} from './product.controller.js'
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
const api = Router()

api.post('/', [validateJwt, isAdmin],saveProduct)
api.get('/category', [validateJwt],getProductByCategory)
api.get('/sold', [validateJwt],getSold)
api.get('/', [validateJwt],getAll)
api.get('/:id', [validateJwt],getProduct)
api.put('/:id',[validateJwt, isAdmin],updateProduct)
api.delete('/:id', [validateJwt, isAdmin],deleteProduct)

export default api