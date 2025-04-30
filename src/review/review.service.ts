import { Injectable } from '@nestjs/common';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async save(review: Review): Promise<Review> {
    return this.reviewRepository.save(review);
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { user_id: userId },
      relations: ['book', 'book.category'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByBookId(
    bookId: number,
    page: number,
    limit: number,
  ): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { book_id: bookId },
      relations: ['book', 'book.category'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUserIdAndReviewId(userId: number, reviewId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: {
        user_id: userId,
        id: reviewId,
      },
      relations: ['book', 'book.category'],
    });
    if (!review) {
      return new Review();
    }
    return review;
  }

  async deleteById(reviewId: number) {
    await this.reviewRepository.delete({ id: reviewId });
  }
}