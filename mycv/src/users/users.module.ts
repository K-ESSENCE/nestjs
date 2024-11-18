import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //이단계에서 리포지토리 자동 생성
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
