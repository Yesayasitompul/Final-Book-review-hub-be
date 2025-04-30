import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('categories')
  export class Category {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }