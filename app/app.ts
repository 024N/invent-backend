import express from 'express';
import {apiPrint} from './middleware/APIPrint';
import {invalidUrlHandler} from './middleware/InvalidUrlHandler';
import {errorHandler} from './middleware/ErrorHandler';
import UsersController from './controllers/UsersController';
import BooksController from './controllers/BooksController';

const app: express.Application = express();
app.use(express.json());
app.use(apiPrint); // Print Which Api Path Called

app.use('/users', UsersController);
app.use('/books', BooksController);
app.use('*', invalidUrlHandler); // Catch Invalid Path and Send Exception

app.use(errorHandler); // Send Exception and Print Error Log

export default app;
