import { Router } from "express";
import {getAll, getCategory, saveCategory, updateCategory, deleteCategory} from '../categories/category.controller.js'
const api = Router()

api.post('/', saveCategory)
api.get('/', getAll)
api.get('/:id', getCategory)
api.put('/:id',updateCategory)
api.delete('/:id', deleteCategory)

export default api