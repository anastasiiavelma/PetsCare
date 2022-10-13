import {body} from 'express-validator';

export const registerValidation = [
    body('email', "Wrong format email").isEmail(),
    body('password', "Password must contain 8 characters").isLength({min: 5}),
    body('name', "Name must contain 2 characters").isLength({min: 2}),
];

export const loginValidation = [
    body('email', "Wrong format email").isEmail(),
    body('password', "Password must contain 5 characters").isLength({min: 5}),
];

export const articleCreateValidation = [
    body('name', "Enter title of article").isLength({min: 3}).isString(),
    body('textInfo', "Enter text in article").isLength({min: 10}).isString(),
    body('photoUrl', "Wrong photo link").optional().isString(),
];


export const noteCreateValidation = [
    body('name', "Enter title of note").isLength({min: 3}).isString(),
    body('textInfo', "Enter text in note").isLength({min: 10}).isString(),
    body('photoUrl', "Wrong photo link").optional().isString(),
];

export const petPassCreateValidation = [
    body('birth', "Enter correct date").isDate().isString(),
    body('feed', "Enter correct feed").isLength({min: 2}).isString(),
    body('gender', "Enter correct gender").isLength({min: 2}).isString(),
    body('coloration', "Enter correct coloration").isLength({min: 5}).isString(),
    body('weight', "Enter correct weight").isDecimal().isString(),
    body('photoUrl', "Wrong photo link").optional().isString(),
];



