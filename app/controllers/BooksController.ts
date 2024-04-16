import express, {Request, Response, NextFunction} from 'express';
import {BooksService} from '../services/BooksService';
import {sendFailed, sendSuccess} from '../utils/Response';
import {requestValidator} from '../middleware/RequestValidator';
import {createBook, getBook, getBooks} from '../models/schema/Book';
import Book from '../models/model/Book';

const router = express.Router();
const booksService = new BooksService();

// Get all books
router.get(
  '/',
  requestValidator(getBooks),
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await booksService.getBooks().catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

// Get book by id
router.get(
  '/:bookId',
  requestValidator(getBook),
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    const response = await booksService.getBookInfo(bookId).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

// Create a new book
router.post(
  '/',
  requestValidator(createBook),
  async (req: Request, res: Response, next: NextFunction) => {
    const newBookName: Book = req.body.name;
    const response = await booksService.createBook(newBookName).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

export default router;
