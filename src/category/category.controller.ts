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
  import { CreateCategoryDTO } from './create-category.dto';
  import { CategoryService } from './category.service';
  import { Category } from './category.entity';
  import { ApiParam, ApiQuery } from '@nestjs/swagger';
  
  @Controller('category')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    
    @Post()
    async create(@Req() request: Request, @Body() createCategoryDTO: CreateCategoryDTO) {
      const category: Category = new Category();
      const userJwtPayload: JwtPayloadDto = request['user'];
      category.name = createCategoryDTO.name;
      category.description = createCategoryDTO.description;
      category.user_id = userJwtPayload.sub;
      await this.categoryService.save(category);
    }
  
    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
      @Req() request: Request,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ): Promise<Category[]> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.categoryService.findByUserId(userJwtPayload.sub, page, limit);
    }
  
    @Get('all')
    async getAllCategories(): Promise<Category[]> {
      return await this.categoryService.findAll();
    }
  
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the category' })
    async findOne(
      @Req() request: Request,
      @Param('id') id: number,
    ): Promise<Category> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.categoryService.findByUserIdAndCategoryId(userJwtPayload.sub, id);
    }
  
    @Put(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the category' })
    async updateOne(
      @Req() request: Request,
      @Param('id') id: number,
      @Body() createCategoryDTO: CreateCategoryDTO,
    ) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const category: Category = await this.categoryService.findByUserIdAndCategoryId(
        userJwtPayload.sub,
        id,
      );
      if (category.id == null) {
        throw new NotFoundException();
      }
      category.name = createCategoryDTO.name;
      category.description = createCategoryDTO.description;
      await this.categoryService.save(category);
    }
  
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the category' })
    async deleteOne(@Req() request: Request, @Param('id') id: number) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const category: Category = await this.categoryService.findByUserIdAndCategoryId(
        userJwtPayload.sub,
        id,
      );
      if (category.id == null) {
        throw new NotFoundException();
      }
      await this.categoryService.deleteById(id);
    }
  }