import { Router } from "express";
import {getAll, getCategory, saveCategory, updateCategory, deleteCategory} from './category.controller.js'
import { validateJwt, isAdmin } from "../../middlewares/validate.jwt.js";
const api = Router()

api.post('/',[validateJwt, isAdmin],saveCategory)
api.get('/', [validateJwt],getAll)
api.get('/:id', [validateJwt, isAdmin],getCategory)
api.put('/:id',[validateJwt, isAdmin],updateCategory)
api.delete('/:id', [validateJwt, isAdmin],deleteCategory)

export default api