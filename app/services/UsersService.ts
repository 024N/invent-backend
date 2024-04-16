import * as dotenv from 'dotenv';
import fs from 'fs-extra';
import userInfo from '../models/model/User';
import {CustomError, NotAvailableException, NotExistException} from '../utils/CustomError';
import {BooksService} from './BooksService';

dotenv.config({path: '.env.local'});
const booksService = new BooksService();

export class UsersService {
  public async getUsers(): Promise<any> {
    const userList: Array<userInfo> = await this.readFile();
    return userList;
  }

  public async getUserInfo(userId: string): Promise<any> {
    const userList: Array<userInfo> = await this.readFile();
    for (const user of userList) {
      if (user.id === userId) {
        return user;
      }
    }
    throw new NotExistException('User that does not exist', 'Users');
  }

  public async createUser(newUserName: any): Promise<any> {
    const userList: Array<userInfo> = await this.readFile();
    const id = Date.now().toString();
    const newUser: userInfo = {
      id: id,
      name: newUserName,
      borrowedBooks: [],
      currentBooks: [],
    };
    userList.push(newUser);
    await this.writeFile(userList);
    return id;
  }

  // ########################################################
  public async borrowBook(userId: string, bookId: string): Promise<any> {
    const userList: Array<userInfo> = await this.readFile();
    const userIndex = userList.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new NotExistException('User not found', 'Users');
    }

    const book = await booksService.getBookInfo(bookId);
    if (book.available === false) {
      throw new NotAvailableException(
        'Book already borrowed by a user',
        'Users'
      );
    }

    const user = userList[userIndex];
    user.currentBooks.push(bookId);
    const response = await booksService.updateBook(bookId, false);
    if (response) {
      await this.writeFile(userList);
      return 'Book borrowed successfully';
    }
    return 'Book borrowed NOT successfully';
  }

  public async returnBook(
    userId: string,
    bookId: string,
    rate: number
  ): Promise<any> {
    const userList: Array<userInfo> = await this.readFile();
    const userIndex = userList.findIndex((user: any) => user.id === userId);
    if (userIndex === -1) {
      throw new NotExistException('User not found', 'Users');
    }
    const user = userList[userIndex];
    const bookIndex = user.currentBooks.findIndex(
      (currentBook: any) => currentBook === bookId
    );
    if (bookIndex === -1) {
      throw new NotExistException('Book not borrowed by this user', 'Users');
    }
    const response = await booksService.updateBook(
      bookId,
      true,
      rate
    );
    if (response) {
      user.currentBooks.splice(bookIndex, 1);
      user.borrowedBooks.push(bookId);
      await this.writeFile(userList);
      return 'Book returned successfully';
    }
    return 'Book return NOT successful';
  }

  // ########################################################
  public async readFile(): Promise<any> {
    try {
      const data = await fs.readFile('./app/db/users.json', 'utf8');
      const response = JSON.parse(data);
      return response;
    } catch (error) {
      console.log('Read File Error', error);
    }
  }

  public async writeFile(user: Array<userInfo>) {
    try {
      const userString: string = JSON.stringify(user);
      const data = await fs.writeFile('./app/db/users.json', userString);
    } catch (error) {
      console.log('Write File Error', error);
    }
  }
}
