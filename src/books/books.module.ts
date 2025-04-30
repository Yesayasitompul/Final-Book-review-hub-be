import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  providers: [BooksService],
  imports: [
    TypeOrmModule.forFeature([Books]),
    CategoryModule
  ],
  controllers: [BooksController],
  exports: [BooksService]
})
export class BooksModule {}
