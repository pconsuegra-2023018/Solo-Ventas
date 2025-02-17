import { Router } from "express";
import {getAll, getProduct, saveProduct, updateProduct, deleteProduct} from '../products/product.controller.js'
const api = Router()

api.post('/', saveProduct)
api.get('/', getAll)
api.get('/:id', getProduct)
api.put('/:id',updateProduct)
api.delete('/:id', deleteProduct)

export default api