import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefautUsers1689519802443 implements MigrationInterface {
  /**
   * Create default users
   * ```
   * Admin user: super.admin@gmail.com
   * User 1: user.1@gmail.com
   * User 2: user.3@gmail.com
   * ```
   * With the same password `Abc@123456`
   * @param queryRunner .
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      INSERT INTO account VALUES ('admin-acount-1','2022-12-11 10:10:29.155547','2022-12-27 07:17:44.000000','super.admin@gmail.com','$2b$10$X5LqgWCqBD4ENxD7C7CVeOUsN.SmqB.xabuGZG5i9kXRCsaJmj58m','Activated','Admin')
      `,
    );
    await queryRunner.query(
      `
      INSERT INTO account VALUES('0f55ba2e-eeeb-4ed8-9a76-2e1130570e34', '2023-07-16 09:49:14.156136', '2023-07-16 09:49:14.156136', 'user.2@gmail.com', '$2b$10$eXsTKx3kmkdQT7J0XraEseTKCDrzz4mMHbkPcZzVNi9M8WpLE51XS', 'Activated', 'User');
      `,
    );
    await queryRunner.query(
      `
      INSERT INTO account VALUES('4e66529c-be91-48f7-a966-9a8bbace8645', '2023-07-16 09:49:00.036866', '2023-07-16 09:49:00.036866', 'user.1@gmail.com', '$2b$10$0/8yjfBA1dom3d2HLE/lFeNPHndiSiSQb/ohgh3ddJaBkS13x3tHi', 'Activated', 'User');
      `,
    );
    await queryRunner.query(
      `
      INSERT INTO profile VALUES ('admin-profile-1','2022-12-11 10:10:29.188080','2022-12-26 02:26:56.000000','Super Admin','+841234566','','admin-acount-1');
      `,
    );
    await queryRunner.query(
      `
      INSERT INTO profile VALUES('0801a2ac-940c-4bd8-b15b-c7a60415b4a8', '2023-07-16 09:49:14.183511', '2023-07-16 09:51:38.466442', 'User 2', '12355667899', NULL, '0f55ba2e-eeeb-4ed8-9a76-2e1130570e34');
      `,
    );
    await queryRunner.query(
      `
      INSERT INTO profile VALUES('dccb4325-e5b0-4c7a-8fe9-e0dc59364c28', '2023-07-16 09:49:00.057927', '2023-07-16 09:49:00.057927', 'User 1', '12355667899', NULL, '4e66529c-be91-48f7-a966-9a8bbace8645');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
