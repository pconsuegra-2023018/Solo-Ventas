import { Router } from "express";
import { getAll, addProduct, deleteProduct, cleanCart, getCartProfile } from "./cart.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
const api = Router()

api.post('/:id', [validateJwt],addProduct)
api.delete('/:id',[validateJwt], deleteProduct)
api.get('/clean',[validateJwt],cleanCart)
api.get('/cart',[validateJwt],getCartProfile)

//TEST
api.get('/',getAll)


export default api