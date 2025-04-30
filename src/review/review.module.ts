import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    BooksModule
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}