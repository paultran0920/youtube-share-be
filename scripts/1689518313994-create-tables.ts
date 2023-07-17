import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1689518313994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      CREATE TABLE account (
        id varchar(36) NOT NULL,
        created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        modified_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        status varchar(255) NOT NULL,
        role varchar(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
      `,
    );
    await queryRunner.query(
      `
      CREATE TABLE profile (
        id varchar(36) NOT NULL,
        created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        modified_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        name varchar(255) NOT NULL,
        contact varchar(255) NOT NULL,
        avatar varchar(2048) DEFAULT NULL,
        account_id varchar(255) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY REL_a39874be76793f8a9be22dcf4d (account_id),
        CONSTRAINT FK_a39874be76793f8a9be22dcf4df FOREIGN KEY (account_id) REFERENCES account (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
      `,
    );
    await queryRunner.query(
      `
      CREATE TABLE youtube (
        id varchar(36) NOT NULL,
        created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        modified_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        video_id varchar(255) NOT NULL,
        url varchar(2048) NOT NULL,
        title varchar(1000) NOT NULL,
        description varchar(2000) NOT NULL,
        owner varchar(255) NOT NULL,
        thumbnail_url varchar(2048) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
