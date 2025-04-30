import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1745556787897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE categories (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id) 
                    REFERENCES Users(id)
                    ON DELETE CASCADE
            );
          `);
          
        // Add foreign key constraint to books table
        await queryRunner.query(`
            ALTER TABLE books
            ADD CONSTRAINT fk_category
            FOREIGN KEY (category_id)
            REFERENCES categories(id)
            ON DELETE SET NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint first
        await queryRunner.query(`
            ALTER TABLE books
            DROP CONSTRAINT IF EXISTS fk_category;
        `);
        
        await queryRunner.query(`DROP TABLE categories;`);
    }
}