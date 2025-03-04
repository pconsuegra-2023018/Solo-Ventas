import { Router } from "express";
import { addInvoice, getInvoices, getInvoiceById, updateInvoice } from "./invoice.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
const api = Router()

api.get('/invoice', [validateJwt],addInvoice)
api.get('/', [validateJwt],getInvoices)
api.get('/', [validateJwt],getInvoiceById)
api.put('/:id', [validateJwt],updateInvoice)

export default api