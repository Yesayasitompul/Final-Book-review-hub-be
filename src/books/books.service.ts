import { Injectable } from '@nestjs/common';
import { Books } from './books.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books) private booksRepository: Repository<Books>,
  ) {}

  async save(book: Books): Promise<Books> {
    return this.booksRepository.save(book);
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Books[]> {
    return await this.booksRepository.find({
      where: { user_id: userId },
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUserIdAndPostId(userId: number, bookId: number): Promise<Books> {
    const book = await this.booksRepository.findOne({
      where: {
        user_id: userId,
        id: bookId,
      },
      relations: ['category'],
    });
    if (!book) {
      return new Books();
    }
    return book;
  }

  async findById(bookId: number): Promise<Books> {
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
      relations: ['category'],
    });
    
    if (!book) {
      return new Books();
    }
    
    return book;
  }

  async deleteById(bookId: number) {
    await this.booksRepository.delete({ id: bookId });
  }
}
