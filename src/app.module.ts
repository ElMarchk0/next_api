import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FacilityModule } from './facility/facility.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'NextTest2024',
      username: 'next',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: 'next_api',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    FacilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
