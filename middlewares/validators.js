import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { existEmail, existUsername, notRequiredField, objectIdValid } from "../utils/db.validators.js"


export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    body('role', 'Role is not required')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('status', 'Status is not required')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
        validateErrorsWithoutFiles
]

export const updateUserValidator = [
    body('username')
        .optional() 
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('status')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles 
]

export const registerCategory = [
    body('username', 'Name cannot be empty')
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .notEmpty(),
    validateErrors
]


