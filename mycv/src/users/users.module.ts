import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //이단계에서 리포지토리 자동 생성
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
})
export class UsersModule {}
