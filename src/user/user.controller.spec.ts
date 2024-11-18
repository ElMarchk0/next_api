import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// This test suite uses the actual database and not a mocked database
describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let userId: string;

  describe('/user (POST)', () => {
    it('should create a new user', async () => {
      const phnInt = Math.floor(
        10000000000 + Math.random() * 9000000000,
      ).toString();
      const createUserDto: CreateUserDto = {
        personalHealthNumber: phnInt,
        admission: new Date(),
        canEat: true,
        canDrink: true,
        status: 'active',
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(201);

      const user: User = response.body;
      expect(user).toHaveProperty('id');
      expect(user.personalHealthNumber).toBe(
        createUserDto.personalHealthNumber,
      );
      userId = user.id;
    });
  });

  describe('/user/:id (GET)', () => {
    it('should return the created user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/user/${userId}`)
        .expect(200);

      const user: User = response.body;
      expect(user.id).toBe(userId);
    });
  });

  describe('/user/:id/status (PATCH)', () => {
    it('should update the user status', async () => {
      const updateUserDto: UpdateUserDto = { status: 'inactive' };

      const response = await request(app.getHttpServer())
        .patch(`/user/${userId}/status`)
        .send(updateUserDto)
        .expect(200);

      const user: User = response.body;
      expect(user.status).toBe(updateUserDto.status);
    });
  });

  describe('/user/:id/can_eat (PATCH)', () => {
    it('should update the user canEat field', async () => {
      const updateUserDto: UpdateUserDto = { canEat: false };

      const response = await request(app.getHttpServer())
        .patch(`/user/${userId}/can_eat`)
        .send(updateUserDto)
        .expect(200);

      const user: User = response.body;
      expect(user.canEat).toBe(updateUserDto.canEat);
    });
  });

  describe('/user/:id/can_drink (PATCH)', () => {
    it('should update the user canDrink field', async () => {
      const updateUserDto: UpdateUserDto = { canDrink: false };

      const response = await request(app.getHttpServer())
        .patch(`/user/${userId}/can_drink`)
        .send(updateUserDto)
        .expect(200);

      const user: User = response.body;
      expect(user.canDrink).toBe(updateUserDto.canDrink);
    });
  });

  describe('/user/:id (DELETE)', () => {
    it('should remove the user', async () => {
      await request(app.getHttpServer()).delete(`/user/${userId}`).expect(200);

      await request(app.getHttpServer()).get(`/user/${userId}`).expect(404);
    });
  });
});
