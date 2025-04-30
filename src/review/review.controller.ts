import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Req,
  } from '@nestjs/common';
  import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
  import { CreateReviewDTO } from './create-review.dto';
  import { ReviewService } from './review.service';
  import { Review } from './review.entity';
  import { ApiParam, ApiQuery } from '@nestjs/swagger';
  import { BooksService } from '../books/books.service';
  
  @Controller('review')
  export class ReviewController {
    constructor(
      private readonly reviewService: ReviewService,
      private readonly booksService: BooksService,
    ) {}
    
    @Post()
    async create(@Req() request: Request, @Body() createReviewDTO: CreateReviewDTO) {
      const review: Review = new Review();
      const userJwtPayload: JwtPayloadDto = request['user'];
      
      // Verify that the book exists
      const book = await this.booksService.findById(createReviewDTO.bookId);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      
      review.book_id = createReviewDTO.bookId;
      review.ulasan = createReviewDTO.ulasan;
      review.user_id = userJwtPayload.sub;
      await this.reviewService.save(review);
    }
  
    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
      @Req() request: Request,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ): Promise<Review[]> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.reviewService.findByUserId(userJwtPayload.sub, page, limit);
    }
  
    @Get('book/:bookId')
    @ApiParam({ name: 'bookId', type: Number, description: 'ID of the book' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findByBookId(
      @Param('bookId') bookId: number,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ): Promise<Review[]> {
      return await this.reviewService.findByBookId(bookId, page, limit);
    }
  
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the review' })
    async findOne(
      @Req() request: Request,
      @Param('id') id: number,
    ): Promise<Review> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.reviewService.findByUserIdAndReviewId(userJwtPayload.sub, id);
    }
  
    @Put(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the review' })
    async updateOne(
      @Req() request: Request,
      @Param('id') id: number,
      @Body() createReviewDTO: CreateReviewDTO,
    ) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const review: Review = await this.reviewService.findByUserIdAndReviewId(
        userJwtPayload.sub,
        id,
      );
      if (review.id == null) {
        throw new NotFoundException();
      }
      
      // Verify that the book exists
      const book = await this.booksService.findById(createReviewDTO.bookId);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      
      review.book_id = createReviewDTO.bookId;
      review.ulasan = createReviewDTO.ulasan;
      await this.reviewService.save(review);
    }
  
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the review' })
    async deleteOne(@Req() request: Request, @Param('id') id: number) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const review: Review = await this.reviewService.findByUserIdAndReviewId(
        userJwtPayload.sub,
        id,
      );
      if (review.id == null) {
        throw new NotFoundException();
      }
      await this.reviewService.deleteById(id);
    }
  }