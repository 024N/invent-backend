import * as dotenv from 'dotenv';
import fs from 'fs-extra';
import bookInfo from '../models/model/Book';
import {NotExistException} from '../utils/CustomError';

dotenv.config({path: '.env.local'});

export class BooksService {
  public async getBooks(): Promise<any> {
    const bookList: Array<bookInfo> = await this.readFile();
    return bookList;
  }

  public async getBookInfo(bookId: string): Promise<any> {
    const bookList: Array<bookInfo> = await this.readFile();
    for (const book of bookList) {
      if (book.id === bookId) {
        return book;
      }
    }
    throw new NotExistException('Book that does not exist', 'Books');
  }

  public async createBook(newBookName: any): Promise<any> {
    const bookList: Array<bookInfo> = await this.readFile();
    const id = Date.now().toString();
    const newBook: bookInfo = {
      id: id,
      name: newBookName,
      available: true,
      rate: 0,
    };
    bookList.push(newBook);
    await this.writeFile(bookList);
    return id;
  }

  public async updateBook(
    bookId: string,
    availability: boolean,
    rate?: number
  ): Promise<any> {
    const bookList: Array<bookInfo> = await this.readFile();
    const updatedBookList = bookList.map((book: any) => {
      if (book.id === bookId) {
        book.available = availability;
      }
      if (rate) {
        if (book.rate === 0) {
          book.rate = rate;
        } else {
          book.rate = (book.rate + rate) / 2;
        }
      }
      return book;
    });
    await this.writeFile(updatedBookList);
    return true;
  }

  public async readFile(): Promise<any> {
    try {
      const data = await fs.readFile('./app/db/books.json', 'utf8');
      const response = JSON.parse(data);
      return response;
    } catch (error) {
      console.log('Read File Error', error);
    }
  }

  public async writeFile(books: Array<bookInfo>) {
    try {
      const bookString: string = JSON.stringify(books);
      await fs.writeFile('./app/db/books.json', bookString);
    } catch (error) {
      console.log('Write File Error', error);
    }
  }
}
