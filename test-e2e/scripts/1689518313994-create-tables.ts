import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1689518313994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      CREATE TABLE account (
        id varchar(36) PRIMARY KEY,
        created_at datetime NOT NULL,
        modified_at datetime NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        status varchar(255) NOT NULL,
        role varchar(255) NOT NULL
      );
      `,
    );
    await queryRunner.query(
      `
      CREATE TABLE profile (
        id varchar(36) PRIMARY KEY,
        created_at datetime NOT NULL,
        modified_at datetime NOT NULL,
        name varchar(255) NOT NULL,
        contact varchar(255) NOT NULL,
        avatar varchar(2048) DEFAULT NULL,
        account_id varchar(255) NOT NULL
      );
      `,
    );
    await queryRunner.query(
      `
      CREATE TABLE youtube (
        id varchar(36) PRIMARY KEY,
        created_at datetime NOT NULL,
        modified_at datetime NOT NULL,
        video_id varchar(255) NOT NULL,
        url varchar(2048) NOT NULL,
        title varchar(1000) NOT NULL,
        description varchar(2000) NOT NULL,
        owner varchar(255) NOT NULL,
        thumbnail_url varchar(2048) NOT NULL
      );
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
