import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from 'src/setup-app';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  it(' handles a signup request ', () => {
    const email = 'asd@naver.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'sdasda' })
      .expect(201)
      .then((res) => {
        const { id, email2 } = res.body;
        expect(id).toBeDefined();
        expect(email2).toEqual(email);
      });
  });
});
