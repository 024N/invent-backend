import express, {Request, Response, NextFunction} from 'express';
import {UsersService} from '../services/UsersService';
import {sendFailed, sendSuccess} from '../utils/Response';
import {requestValidator} from '../middleware/RequestValidator';
import {borrowBook, createUser, getUser, getUsers, returnBook} from '../models/schema/User';
import User from '../models/model/User';

const router = express.Router();
const usersService = new UsersService();

// Get all users
router.get(
  '/',
  requestValidator(getUsers),
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await usersService.getUsers().catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

// Get user by id
router.get(
  '/:userId',
  requestValidator(getUser),
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const response = await usersService.getUserInfo(userId).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

// Create a new user
router.post(
  '/',
  requestValidator(createUser),
  async (req: Request, res: Response, next: NextFunction) => {
    const newUserName: User = req.body.name;
    const response = await usersService.createUser(newUserName).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

//#############################################
// Borrow a book for user
router.post(
  '/:userId/borrow/:bookId',
  requestValidator(borrowBook),
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const response = await usersService.borrowBook(userId, bookId).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

router.post(
  '/:userId/return/:bookId',
  requestValidator(returnBook),
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const score = req.body.score;
    const response = await usersService.returnBook(userId, bookId, score).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

export default router;
