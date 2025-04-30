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
  import { CreateBooksDTO } from './create-books.dto';
  import { BooksService } from './books.service';
  import { Books } from './books.entity';
  import { ApiParam, ApiQuery } from '@nestjs/swagger';
  import { CategoryService } from '../category/category.service';
  
  @Controller('books')
  export class BooksController {
    constructor(
      private readonly booksService: BooksService,
      private readonly categoryService: CategoryService,
    ) {}
    
    @Post()
    async create(@Req() request: Request, @Body() createBooksDTO: CreateBooksDTO) {
      const book: Books = new Books();
      const userJwtPayload: JwtPayloadDto = request['user'];
      
      // Verify that the category exists
      const category = await this.categoryService.findById(createBooksDTO.categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      
      book.title = createBooksDTO.title;
      book.author = createBooksDTO.author;
      book.category_id = createBooksDTO.categoryId;
      book.image_url = createBooksDTO.imageUrl;
      book.user_id = userJwtPayload.sub;
      await this.booksService.save(book);
    }
  
    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
      @Req() request: Request,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ): Promise<Books[]> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.booksService.findByUserId(userJwtPayload.sub, page, limit);
    }
  
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the book' })
    async findOne(
      @Req() request: Request,
      @Param('id') id: number,
    ): Promise<Books> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.booksService.findByUserIdAndPostId(userJwtPayload.sub, id);
    }
  
    @Put(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the book' })
    async updateOne(
      @Req() request: Request,
      @Param('id') id: number,
      @Body() createBooksDTO: CreateBooksDTO,
    ) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const book: Books = await this.booksService.findByUserIdAndPostId(
        userJwtPayload.sub,
        id,
      );
      if (book.id == null) {
        throw new NotFoundException();
      }
      
      // Verify that the category exists
      const category = await this.categoryService.findById(createBooksDTO.categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      
      book.title = createBooksDTO.title;
      book.author = createBooksDTO.author;
      book.category_id = createBooksDTO.categoryId;
      book.image_url = createBooksDTO.imageUrl;
      await this.booksService.save(book);
    }
  
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the book' })
    async deleteOne(@Req() request: Request, @Param('id') id: number) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const book: Books = await this.booksService.findByUserIdAndPostId(
        userJwtPayload.sub,
        id,
      );
      if (book.id == null) {
        throw new NotFoundException();
      }
      await this.booksService.deleteById(id);
    }
  }
  