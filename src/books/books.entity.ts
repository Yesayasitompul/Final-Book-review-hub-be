import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Category } from '../category/category.entity';
  
  @Entity('books')
  export class Books {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    title: string;
  
    @Column()
    author: string;
  
    @Column()
    category_id: number;
  
    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;
  
    @Column()
    image_url: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  