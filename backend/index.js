
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import { registerValidation }from './validations/auth.js';

import AccountModel from './models/Account.js';
import checkAuth from './utils/checkAuth.js'

const app = express()
const port = 3000

app.use(express.json());

mongoose.connect('mongodb+srv://petsCare:PetsCare270203Work@petscare.q0mdbtj.mongodb.net/PetsCare?retryWrites=true&w=majority').then(() => console.log('db ok')).catch((err) => console.log('bb err', err));

app.post('/auth/login',  async (req, res) => {

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
});


app.post('/auth/register', registerValidation, async (req, res) => {
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
});

app.get('/auth/me', checkAuth, (req, res) => {
  try{
    res.json({
        success: true,
    });
  } catch(err) {}

});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})