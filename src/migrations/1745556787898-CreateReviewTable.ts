import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1745556787898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE reviews (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                book_id INTEGER NOT NULL,
                ulasan TEXT NOT NULL,
                created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id) 
                    REFERENCES Users(id)
                    ON DELETE CASCADE,
                    
                CONSTRAINT fk_book
                    FOREIGN KEY(book_id) 
                    REFERENCES books(id)
                    ON DELETE CASCADE
            );
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE reviews;`)
    }
}