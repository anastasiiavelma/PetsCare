import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import AccountModel from "../models/Account.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new AccountModel({
            email: req.body.email,
            passwordHash: hash,
        });

        const account = await doc.save();

        const token = jwt.sign(
            {
                _id: account._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );
        const {passwordHash, ...accountData} = account._doc;
        res.json({
            ...accountData, token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong',
        });

    }
};

export const login = async (req, res) => {

    try{
        const account = await AccountModel.findOne({ email: req.body.email});

        if(!account) {
            return res.status(404).json({
                message: 'Wrong password or login',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, account._doc.passwordHash);

        if(!isValidPass){
            return res.status(400).json({
                message: 'Wrong password or login',
            });
        }
        const token = jwt.sign(
            {
                _id: account._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...accountData} = account._doc;

        res.json({
            ...accountData, token,
        });

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong',
        });
    };
};

export const getMe = async (req, res) => {
    try {
        const account = await AccountModel.findById(req.accountId);

        if (!account) {
            return res.status(404).json({
                message: 'Not found this account'
            });
        }

        const {passwordHash, ...accountData} = account._doc;
        res.json({accountData});

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }

};



