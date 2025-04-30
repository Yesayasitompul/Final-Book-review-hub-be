import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Books } from '../books/books.entity';
  
  @Entity('reviews')
  export class Review {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    book_id: number;
  
    @ManyToOne(() => Books)
    @JoinColumn({ name: 'book_id' })
    book: Books;
  
    @Column()
    ulasan: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }