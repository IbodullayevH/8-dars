import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UpdateBookAvailabilityDto } from './dto/UpdateBookAvailabilityDto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post('new')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('all')
  findAll() {
    return this.booksService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Patch('update/:id/availability')
  async updateAvailability(
    @Param('id') id: number, 
    @Body() updateBookAvailabilityDto: UpdateBookAvailabilityDto
  ) {
    return this.booksService.updateAvailability(id, updateBookAvailabilityDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
