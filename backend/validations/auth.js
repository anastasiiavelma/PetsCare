import {body} from 'express-validator';

export const registerValidation = [
    body('email', "Wrong format email").isEmail(),
    body('password', "Password must contain 8 characters").isLength({min: 5}),
];