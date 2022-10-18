import express from 'express';
import mongoose from 'mongoose';
import {
    registerValidation,
    loginValidation,
    articleCreateValidation,
    noteCreateValidation,
    petPassCreateValidation
} from './validations.js';
import checkAuth from './utils/checkAuth.js'
import * as AccountController from './controllers/AccountController.js';
import * as ArticleController from './controllers/ArticleController.js';
import * as NoteController from "./controllers/NoteControllers.js";
import * as petPassportController from "./controllers/petPassportConrollers.js";
import * as TestControllers from "./controllers/TestControllers.js";
import cors from "cors";

const app = express()
const port = 5000

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://petsCare:PetsCare270203Work@petscare.q0mdbtj.mongodb.net/PetsCare?retryWrites=true&w=majority').then(() => console.log('db ok')).catch((err) => console.log('bb err', err));

app.post('/auth/login', loginValidation, AccountController.login );
app.post('/auth/register', registerValidation, AccountController.register);
app.get('/auth/me', checkAuth, AccountController.getMe);


app.get('/articles',  ArticleController.getAll);
app.get('/articles/:id', checkAuth, ArticleController.getOne);
app.post('/articles',checkAuth, articleCreateValidation, ArticleController.create);
app.delete('/articles/:id',checkAuth, ArticleController.remove);
app.patch('/articles/:id',checkAuth, ArticleController.update);

app.get('/notes',  NoteController.getAll);
app.get('/notes/:id', checkAuth, NoteController.getOne);
app.post('/notes', checkAuth, noteCreateValidation, NoteController.create);
app.delete('/notes/:id',checkAuth, NoteController.remove);
app.patch('/notes/:id',checkAuth, NoteController.update);

app.get('/petPass', petPassportController.getAll);
app.get('/petPass/:id', checkAuth, petPassportController.getOne);
app.post('/petPass', checkAuth, petPassCreateValidation,petPassportController.create);
app.delete('/petPass/:id',checkAuth,petPassportController.remove);
app.patch('/petPass/:id',checkAuth, petPassportController.update);

app.get('/tests', TestControllers.getAll);
app.get('/tests/:id', checkAuth, TestControllers.getOne);
app.post('/tests', checkAuth, TestControllers.create);
app.delete('/tests/:id',checkAuth,TestControllers.remove);
app.patch('/tests/:id',checkAuth, TestControllers.update);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})