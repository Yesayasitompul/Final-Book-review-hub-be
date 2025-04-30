import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  async save(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findByUserIdAndCategoryId(userId: number, categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        user_id: userId,
        id: categoryId,
      },
    });
    if (!category) {
      return new Category();
    }
    return category;
  }

  async findById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId }
    });
    
    if (!category) {
      return new Category();
    }
    
    return category;
  }

  async deleteById(categoryId: number) {
    await this.categoryRepository.delete({ id: categoryId });
  }
}