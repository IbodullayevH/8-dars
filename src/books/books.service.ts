import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBookAvailabilityDto } from './dto/UpdateBookAvailabilityDto';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>
  ) { }

  // create new book
  async create(createBookDto: CreateBookDto) {
    try {
      // check for similarity
      let existBook = await this.bookRepo.findOne({ where: { title: createBookDto.title } })

      if (existBook) {
        throw new HttpException('Book with this title already exists...', HttpStatus.CONFLICT)
      }

      // new book
      let book = this.bookRepo.create(createBookDto)
      let newBook = await this.bookRepo.save(book)

      // respoonse message
      if (newBook) {
        return {
          book_data: {
            success: true,
            message: 'successfully created  new book',
            data: newBook
          }
        }
      } else {
        throw new HttpException('Something wentrong creating book: ', HttpStatus.BAD_REQUEST)
      }

    } catch (error) {
      throw error
    }
  }

  // get all
  async findAll() {
    try {

      // find books
      let bookData = await this.bookRepo.find()
      if (bookData) {
        return {
          success: true,
          message: 'All books data',
          bookData
        }
      } else {
        throw {
          success: false,
          message: 'Books not available',
          data: []
        }
      }
    } catch (error) {
      throw error
    }
  }


  // by id
  async findOne(id: number) {
    try {

      // find by id book
      let bookData = await this.bookRepo.findOne({
        where: {
          id: id
        }
      })

      if (bookData) {
        return {
          success: true,
          message: `book with id ${id}`,
          bookData
        }
      } else {
        throw new NotFoundException(`not foun book with id ${id}`)
      }
    } catch (error) {
      throw error
    }
  }


  // update book 
  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      // check book is available
      let checkBook = await this.bookRepo.findOne({ where: { id: id } })

      if (!checkBook) {
        throw new NotFoundException('Book not found')
      }

      // new book
      await this.bookRepo.update(id, updateBookDto)

      let updatedBook = await this.bookRepo.findOne({ where: { id } })
      // respoonse message
      if (updatedBook) {
        return {
          book_data: {
            success: true,
            message: 'successfully updated book',
            data: updatedBook
          }
        }
      } else {
        throw new HttpException('Something went wrong updating the book', HttpStatus.BAD_REQUEST)
      }

    } catch (error) {
      throw error
    }
  }


  // update is availability
  async updateAvailability(id: number, updateBookAvailabilityDto: UpdateBookAvailabilityDto) {
    try {
      let checkBook = await this.bookRepo.findOne({ where: { id: id } });

      if (!checkBook) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      checkBook.isAvailable = updateBookAvailabilityDto.isAvailable;
      await this.bookRepo.save(checkBook);

      return {
        success: true,
        message: `Book availability updated successfully`,
        data: checkBook
      };

    } catch (error) {
      throw error
    }
  }


  // delete book
  async remove(id: number) {
    try {
      // Check if book exists
      let checkBook = await this.bookRepo.findOne({ where: { id: id } });

      if (!checkBook) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      // Remove the book
      await this.bookRepo.delete(id);

      // Response message after successful deletion
      return {
        success: true,
        message: `Book with id ${id} has been successfully removed`,
      };

    } catch (error) {
      throw error;  // Let Nest handle the error, no need to wrap it again
    }
  }

}
