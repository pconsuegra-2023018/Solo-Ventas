import { Router } from "express";
import { register, login, getUser, getUserById, updateUser, deleteUser, updatePassword} from "./user.controller.js";
import { validateJwt,isAdmin,isCLient } from "../../middlewares/validate.jwt.js"; 
import { registerValidator } from "../../middlewares/validators.js";

const api = Router()

api.post('/register',[registerValidator],register)
api.post('/login', login)
api.get('/',[validateJwt,isAdmin],getUser)
api.get('/profile', [validateJwt],getUserById)
api.put('/:id',[validateJwt],updateUser)
api.put('/password/:id',[validateJwt, isCLient],updatePassword)
api.delete('/:id',[validateJwt, isCLient], deleteUser)

export default api