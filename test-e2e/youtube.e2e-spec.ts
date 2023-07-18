import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { TYPEORM_MODULE } from './utils';

describe('YoutubeController (e2e)', () => {
  let app: INestApplication;
  let user1Token;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TYPEORM_MODULE, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    user1Token = await new Promise((resolve) => {
      request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'user.1@gmail.com',
          password: 'Abc@123456',
        })
        .then((res) => {
          resolve(res.body.access_token);
        });
    });
  });

  afterAll(async () => {
    await app?.close();
  });

  it('/shareYoutube (POST)', () => {
    return request(app.getHttpServer())
      .post('/youtube/share')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${user1Token}`)
      .send({
        url: 'https://www.youtube.com/watch?v=989-7xsRLR4',
      })
      .expect(201)
      .then((response) => {
        expect(response.body.videoId).toBe('989-7xsRLR4');
      });
  });

  it('/getYoutube (GET)', async () => {
    const ent: any = await new Promise((resolve) => {
      request(app.getHttpServer())
        .post('/youtube/share')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          url: 'https://www.youtube.com/watch?v=989-7xsRLR4',
        })
        .expect(201)
        .then((response) => {
          resolve(response.body);
        });
    });

    return request(app.getHttpServer())
      .get(`/youtube/${ent?.id}`)
      .set('Authorization', `Bearer ${user1Token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.videoId).toBe('989-7xsRLR4');
      });
  });
});
